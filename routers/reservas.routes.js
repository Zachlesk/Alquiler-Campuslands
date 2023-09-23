import { Router } from 'express';

import {
    reservasPendientes,
    clientePendiente,
    clienteReservacion
} from '../controllers/reservas.js'

import validateToken from '../middlewares/validateJWT.js';

import {
    getReservas,
    postReserva,
    deleteReserva,
    putReserva
} from '../controllers/reservas.js'

// ENDPOINTS 

const reservas = Router();

reservas.get('/pendientes', validateToken, reservasPendientes);
reservas.get('/cliente', validateToken, clientePendiente); 
reservas.get('/reservacion', validateToken, clienteReservacion)

// METHODS CRUD HTTP

reservas.get('/get', getReservas);
reservas.post('/post', postReserva);
reservas.delete('/delete/:id',deleteReserva);
reservas.put('/put/:id', putReserva);

export default reservas;