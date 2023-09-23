import db from '../connection/connection.js'

const reservas = db.collection('reserva');

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