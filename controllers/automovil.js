import db from "../connection/connection.js";

const automoviles = db.collection('automoviles');

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