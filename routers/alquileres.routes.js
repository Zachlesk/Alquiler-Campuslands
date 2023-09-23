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

const alquileres = Router();

alquileres.get('/disponibles', automovilesAvailable);
alquileres.get('/activos', activosClientes);
alquileres.get('/detalles/:id', detallesAlquiler);
alquileres.get('/costo/:id', costoTotalAlquiler);
alquileres.get('/fecha', fechaDetalles);
alquileres.get('/datos', datosAlquiler);
alquileres.get('/cantidad', cantidadTotal);
alquileres.get('/capacidad', capacidadDisponibles);
alquileres.get('/mediana', fechaMediana)

export default alquileres;