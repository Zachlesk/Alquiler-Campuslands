import ObjectId from "mongodb";
import db from "../connection/connection.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const clientes = db.collection('clientes');
const empleados = db.collection('empleados');

export async function getClientes(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }
        const results = await clientes.find().toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }   
}

export async function getDNI(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }
        const results = await clientes.find({dni_cliente: parseInt(req.params.dni)}).toArray(); 
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}