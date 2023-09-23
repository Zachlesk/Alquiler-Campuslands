import { ObjectId } from 'mongodb';
import db from "../connection/connection.js";
import dotenv from 'dotenv';

dotenv.config();

const alquileres = db.collection('alquiler');

// ENDPOINTS

export async function automovilesAvailable(req, res) {
    try{
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
        const results = await alquileres.find({id_alquiler: parseInt(req.params.id)}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function costoTotalAlquiler(req, res) {
    try {
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
        const results = await alquileres.find({fecha_inicio: 20230705}).toArray(); 
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function datosAlquiler(req, res) {
    try {
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
        const results = await alquileres.countDocuments();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function capacidadDisponibles(req, res) {
    try {
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
        const results = await alquileres.find({$and: [{fecha_inicio: {$gte: '20230705'}},{fecha_inicio: {$lte: '20230710'}}]}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

// METHODS CRUD HTTP

export async function getAlquileres(req, res) {
    try {
        const info = await alquileres.find().toArray();
        res.json(info);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
};

export async function postAlquiler(req, res) {
    try {
        const data = req.body;
        const response = await alquileres.insertOne(data);
        res.json({
            response,
            data
        });
    } catch (error) {
        console.log(error);
    }
};

export async function deleteAlquiler(req, res) {
    try {
        const id = req.params.id;
        const response = await alquileres.deleteOne({ _id: new ObjectId(id) });
        res.json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function putAlquiler(req, res){
    try {
        const data = req.body;
        const id = req.params.id;
        await alquileres.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.send(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
};


