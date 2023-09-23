import { Router } from 'express';
import {
    getClientes,
    getDNI
} from '../controllers/clientes.js'

const clientes = Router();

clientes.get('/', getClientes);
clientes.get('/dni/:dni', getDNI);

export default clientes;

