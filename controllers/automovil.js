import ObjectId from "mongodb";
import db from "../connection/connection.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const automoviles = db.collection('automoviles');
const empleados = db.collection('empleados');

export async function automovilCincoPasajeros(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }

        const results = await automoviles.find({capacidad_automovil: {$gt: 5}}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function ordenadosMarcaModelo(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }
        const results = await automoviles.find().sort({marca_automovil: 1}, {modelo_automovil: 1}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}