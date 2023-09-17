import { Router } from 'express';
import {
    getClientes
} from '../controllers/clientes.js'

const clientes = Router();

clientes.get('/', getClientes);

export default clientes;

