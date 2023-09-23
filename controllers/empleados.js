import { ObjectId } from 'mongodb';
import db from "../connection/connection.js";
import dotenv from 'dotenv';

dotenv.config();

const empleados = db.collection('empleados');

// ENDPOINTS

export async function vendedorEmpleado(req, res) {
    try {
        const results = await empleados.find({cargo_empleado: 'Vendedor'}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function empleadosAdministrativos(req, res) {
    try {
        const results = await empleados.find({$or: [{cargo_empleado: 'Gerente'}, {cargo_empleado: 'Asistente'}]}).toArray(); 
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}


// METHODS CRUD HTTP

export async function getEmpleados(req, res) {
    try {
        const info = await empleados.find().toArray();
        res.json(info);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } finally {
        client.close();
    }
};

export async function postEmpleado(req, res) {
    try {
        const data = req.body;
        const response = await empleados.insertOne(data);
        res.json({
            response,
            data
        });
    } catch (error) {
        console.log(error);
    }
};

export async function deleteEmpleado(req, res) {
    try {
        const response = await empleados.deleteOne({ _id: new ObjectId(id) });
        res.json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function putEmpleado(req, res){
    try {
        const data = req.body;
        const id = req.params.id;
        await empleados.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.send(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};