import { Router } from 'express';
import {
    automovilesAvailable,
    activosClientes,
    detallesAlquiler,
    costoTotalAlquiler,
    fechaDetalles,
    datosAlquiler,
    cantidadTotal,
    capacidadDisponibles,
    fechaMediana
} from '../controllers/alquileres.js'


import {
    getAlquileres,
    postAlquiler,
    deleteAlquiler,
    putAlquiler
} from '../controllers/alquileres.js'

import validateToken from '../middlewares/validateJWT.js';

const alquileres = Router();

// ENPOINTS

alquileres.get('/disponibles', validateToken, automovilesAvailable);
alquileres.get('/activos', validateToken, activosClientes);
alquileres.get('/detalles/:id', validateToken, detallesAlquiler);
alquileres.get('/costo/:id', validateToken, costoTotalAlquiler);
alquileres.get('/fecha', validateToken, fechaDetalles);
alquileres.get('/datos', validateToken, datosAlquiler);
alquileres.get('/cantidad', cantidadTotal);
alquileres.get('/capacidad', validateToken, capacidadDisponibles);
alquileres.get('/mediana', validateToken, fechaMediana)

// METHODS CRUD HTTP

alquileres.get('/get', getAlquileres);
alquileres.post('/post', postAlquiler);
alquileres.delete('/delete/:id', deleteAlquiler);
alquileres.put('/put/:id', putAlquiler);

export default alquileres;