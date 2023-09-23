import { ObjectId } from 'mongodb';
import db from '../connection/connection.js'
import dotenv from 'dotenv';

dotenv.config();

const reservas = db.collection('reserva');

// ENDPOINTS

export async function reservasPendientes(req, res) {
    try {
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
        const results = await reservas.find({$and: [{ id_cliente: 2 },{ estado: 'Pendiente' }]}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
} 

export async function clienteReservacion(req, res) {
    try {
        const results = reservas.aggregate([
            { $lookup: { from: "clientes", localField: "id_cliente", foreignField: "_id", as: "cliente"}}
        ]).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

// METHODS CRUD HTTP

export async function getReservas(req, res) {
    try {
        const info = await reservas.find().toArray();
        res.json(info);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function postReserva(req, res) {
    try {
        const data = req.body;
        const response = await reservas.insertOne(data);
        res.json({
            response,
            data
        });
    } catch (error) {
        console.log(error);
    }
};

export async function deleteReserva(req, res) {
    try {
        const response = await reservas.deleteOne({ _id: new ObjectId(id) });
        res.json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function putReserva(req, res){
    try {
        const data = req.body;
        const id = req.params.id;
        await reservas.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.send(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};