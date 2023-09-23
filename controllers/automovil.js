import { ObjectId } from 'mongodb';
import db from "../connection/connection.js";
import dotenv from 'dotenv';

dotenv.config();

const automoviles = db.collection('automoviles');

// ENDPOINTS

export async function automovilCincoPasajeros(req, res) {
    try {
        const results = await automoviles.find({capacidad_automovil: {$gt: 5}}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function ordenadosMarcaModelo(req, res) {
    try {
        const results = await automoviles.find().sort({marca_automovil: 1}, {modelo_automovil: 1}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

// METHODS CRUD HTTP

export async function getAutomoviles(req, res) {
    try {
        const info = await automoviles.find().toArray();
        res.json(info);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
};

export async function postAutomovil(req, res) {
    try {
        const data = req.body;
        const response = await automoviles.insertOne(data);
        res.json({
            response,
            data
        });
    } catch (error) {
        console.log(error);
    }
};

export async function deleteAutomovil(req, res) {
    try {
        const id = req.params.id;
        const response = await automoviles.deleteOne({ _id: new ObjectId(id) });
        res.json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
};

export async function putAutomovil(req, res){
    try {
        const data = req.body;
        const id = req.params.id;
        await automoviles.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.send(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


