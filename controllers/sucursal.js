import { ObjectId } from 'mongodb';
import db from "../connection/connection.js";
import dotenv from 'dotenv';

dotenv.config();

const sucursal = db.collection('sucursal');
const sucursal_automovil = db.collection('sucursal_automovil');

// ENDPOINTS

export async function automovilesSucursal(req, res) {
    try {
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

// METHODS CRUD HTTP

export async function getSucursales(req, res) {
    try {
        const info = await sucursal.find().toArray();
        res.json(info);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function postSucursal(req, res) {
    try {
        const data = req.body;
        const response = await sucursal.insertOne(data);
        res.json({
            response,
            data
        });
    } catch (error) {
        console.log(error);
    }
};

export async function deleteSucursal(req, res) {
    try {
        const response = await sucursal.deleteOne({ _id: new ObjectId(id) });
        res.json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function putSucursal(req, res){
    try {
        const data = req.body;
        const id = req.params.id;
        await sucursal.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.send(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};