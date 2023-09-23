import { Router } from "express";
import {
    automovilCincoPasajeros,
    ordenadosMarcaModelo
} from '../controllers/automovil.js'

const automovil = Router();

automovil.get('/capacidad', automovilCincoPasajeros);
automovil.get('/ordenar', ordenadosMarcaModelo);


export default automovil;