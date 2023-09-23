import db from "../connection/connection.js";

const clientes = db.collection('clientes');

export async function getClientes(req, res) {
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