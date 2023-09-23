import ObjectId from "mongodb";
import db from '../connection/connection.js'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const reservas = db.collection('reserva');
const empleados = db.collection('empleados');

export async function reservasPendientes(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }

        const results = await reservas.aggregate([
        { $lookup: {from: 'clientes', localField: 'id_cliente', foreignField: '_id', as: 'cliente'}},
        { $lookup: {from: 'automoviles', localField: 'id_automovil', foreignField: '_id', as: 'automovil'}},
        { $match: { estado: 'Pendiente' }},
        { $project: {_id: 0, reserva: "$$ROOT"}}
        ]).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
    
}

export async function clientePendiente(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }

        const results = await reservas.find({$and: [{ id_cliente: 2 },{ estado: 'Pendiente' }]}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
} 

export async function clienteReservacion(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }
        const results = reservas.aggregate([
            { $lookup: { from: "clientes", localField: "id_cliente", foreignField: "_id", as: "cliente"}}
        ]).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}