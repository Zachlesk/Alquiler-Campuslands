import { Router } from 'express';

import {
    reservasPendientes,
    clientePendiente,
    clienteReservacion
} from '../controllers/reservas.js'

const reservas = Router();

reservas.get('/pendientes', reservasPendientes);
reservas.get('/cliente', clientePendiente); 
reservas.get('/reservacion', clienteReservacion)


export default reservas;