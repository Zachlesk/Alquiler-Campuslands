import ObjectId from "mongodb";
import jwt from "jsonwebtoken";
import db from "../connection/connection.js";
import dotenv from 'dotenv';

dotenv.config();

const sucursal = db.collection('sucursal');
const sucursal_automovil = db.collection('sucursal_automovil');
const empleados = db.collection('empleados');

export async function automovilesSucursal(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }

        const results = await sucursal_automovil.aggregate([
            { $lookup: { from: "sucursal", localField: "id_sucursal", foreignField: "_id", as: "sucursal_info"}},
            { $unwind: "$sucursal_info" }, 
            { $group: { _id: '$id_sucursal', sucursal: { $first: '$sucursal_info' }, cantidad_disponible: { $sum: '$cantidad_disponible'}}},
            { $project: { _id: 0, sucursal: 1, cantidad_disponible: 1 }}
        ]).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function cantidadTotalSucursal(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }

        const results = await sucursal.aggregate([
            { $lookup: { from: "sucursal_automovil", localField: "_id", foreignField: "id_sucursal", as: "sucursal_automovil"}},
            { $unwind: "$sucursal_automovil" }, 
            { $group: { _id: '$id_sucursal', direccion_sucursal: { $first: "$direccion_sucursal" }, cantidad_disponible: { $sum: '$cantidad_disponible' }}},
            { $project: { _id: 0, direccion_sucursal: 1, cantidad_disponible: 1 }}
        ]).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}