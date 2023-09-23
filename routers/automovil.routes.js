import { Router } from "express";
import {
    automovilCincoPasajeros,
    ordenadosMarcaModelo
} from '../controllers/automovil.js'

import {
    getAutomoviles,
    postAutomovil,
    deleteAutomovil,
    putAutomovil
} from '../controllers/automovil.js'

import validateToken from '../middlewares/validateJWT.js';

const automovil = Router();

// ENPOINTS

automovil.get('/capacidad', validateToken, automovilCincoPasajeros);
automovil.get('/ordenar', validateToken, ordenadosMarcaModelo);

// METHODS CRUD HTTP

automovil.get('/get', getAutomoviles);
automovil.post('/post', postAutomovil);
automovil.delete('/delete/:id', deleteAutomovil);
automovil.put('/put/:id', putAutomovil)


export default automovil;