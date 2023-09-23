import db from "../connection/connection.js";

const alquileres = db.collection('alquiler');

export async function automovilesAvailable(req, res) {
    try{
    const results = await alquileres.aggregate([
        { $lookup: { from: "automoviles", localField: "id_automovil", foreignField: "_id", as: "automovil"}},
        { $match: { estado: "Disponible" }},
        { $project: {_id: 0, alquiler: '$$ROOT'}}
    ]).toArray();

    if (results.length === 0) {
        return res.status(404).json({ message: "No hay automóviles disponibles para alquiler." });
    }

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
            { $match: { estado: 'Finalizado', $expr: { $eq: ["$automovil.capacidad_automovil", 5] } }},
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