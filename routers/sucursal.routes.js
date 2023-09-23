import { Router } from "express";
import {
    automovilesSucursal,
    cantidadTotalSucursal
} from '../controllers/sucursal.js'
import validateToken from '../middlewares/validateJWT.js';

import {
    getSucursales,
    postSucursal,
    deleteSucursal,
    putSucursal
} from '../controllers/sucursal.js'

const sucursal = Router();

// ENDPOINTS

sucursal.get('/disponibles', validateToken, automovilesSucursal);
sucursal.get('/direccion', validateToken, cantidadTotalSucursal);

// METHODS HTTP CRUD

sucursal.get('/get', getSucursales);
sucursal.post('/post', postSucursal);
sucursal.delete('/delete/:id', deleteSucursal);
sucursal.put('/put/:id', putSucursal)

export default sucursal;