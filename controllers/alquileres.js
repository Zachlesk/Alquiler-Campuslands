import ObjectId from "mongodb";
import db from "../connection/connection.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const alquileres = db.collection('alquiler');
const empleados = db.collection('empleados');

export async function automovilesAvailable(req, res) {
    try{
    const token = req.header("token");
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const valid = await empleados.findOne({ _id: new ObjectId(uid) });
        if (!valid) {
            return res.send({ msg: "User invalid" })
        }

    const results = await alquileres.aggregate([
        { $lookup: { from: "automoviles", localField: "id_automovil", foreignField: "_id", as: "automovil"}},
        { $match: { estado: "Disponible" }},
        { $project: {_id: 0, alquiler: '$$ROOT'}}
    ]).toArray();

    res.status(302).send(results)
} catch (error) {
    console.error(error)
}
}

export async function activosClientes(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }

        const results = await alquileres.aggregate([
            { $lookup: {from:'clientes', localField: 'id_cliente', foreignField: '_id', as:'cliente'}},
            { $match: { estado: 'Activo'}},
            { $project: {_id: 0, alquiler: '$$ROOT'}}
        ]).toArray();

        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function detallesAlquiler(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }

        const results = await alquileres.find({id_alquiler: parseInt(req.params.id)}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function costoTotalAlquiler(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }

        const results = await alquileres.aggregate([
            { $match: {'id_alquiler': parseInt(req.params.id)}},
            { $project: {_id: 0, id_alquiler: '$id_alquiler', costo_total: '$costo_total'}}
        ]).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function fechaDetalles(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }

        const results = await alquileres.find({fecha_inicio: 20230705}).toArray(); 
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function datosAlquiler(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }

        const results = await alquileres.aggregate([
            { $lookup: {from: "clientes", localField: "id_cliente", foreignField: "_id", as: "cliente"}},
            { $project: { _id: 0, cliente: '$cliente'}}
        ]).toArray()
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function cantidadTotal(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }

        const results = await alquileres.countDocuments();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function capacidadDisponibles(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }

        const results = await alquileres.aggregate([
            { $lookup:{ from: "automoviles", localField: "id_automovil", foreignField: "_id", as: "automovil" }},
            { $unwind: '$automovil'},
            { $match: { estado: 'Disponible', $expr: { $eq: ["$automovil.capacidad_automovil", 5] } }},
            { $project: { _id: 0, automovil: 1 }}            
        ]).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function fechaMediana(req, res) {
    try {
        const token = req.header("token");
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const valid = await empleados.findOne({ _id: new ObjectId(uid) });
            if (!valid) {
                return res.send({ msg: "User invalid" })
            }
        const results = await alquileres.find({$and: [{fecha_inicio: {$gte: '20230705'}},{fecha_inicio: {$lte: '20230710'}}]}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}