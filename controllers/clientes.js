import { ObjectId } from 'mongodb';
import db from "../connection/connection.js";
import dotenv from 'dotenv';

dotenv.config();

const clientes = db.collection('clientes');

// ENDPOINTS

export async function getAllClientes(req, res) {
    try {
        const results = await clientes.find().toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }   
}

export async function getDNI(req, res) {
    try {
        const results = await clientes.find({dni_cliente: parseInt(req.params.dni)}).toArray(); 
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

// METHODS CRUD HTTP

export async function getClientes(req, res) {
    try {
        const info = await clientes.find().toArray();
        res.json(info);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } finally {
        client.close();
    }
};

export async function postCliente(req, res) {
    try {
        const data = req.body;
        const response = await clientes.insertOne(data);
        res.json({
            response,
            data
        });
    } catch (error) {
        console.log(error);
    }
};

export async function deleteCliente(req, res) {
    try {
        const response = await clientes.deleteOne({ _id: new ObjectId(id) });
        res.json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function putCliente(req, res){
    try {
        const data = req.body;
        const id = req.params.id;
        await clientes.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.send(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};