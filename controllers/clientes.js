import db from "../connection/connection.js";

export async function getClientes(req, res) {
    try {
        const collection = await db.collection('clientes');
        const results = await collection.find().toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }   
}

