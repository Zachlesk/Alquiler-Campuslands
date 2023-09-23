import { Router } from 'express';
import {
    getAllClientes,
    getDNI
} from '../controllers/clientes.js'
import validateToken from '../middlewares/validateJWT.js';

import {
    getClientes,
    postCliente,
    putCliente,
    deleteCliente
} from '../controllers/clientes.js'

const clientes = Router();

// ENDPOINTS

clientes.get('/', validateToken, getAllClientes);
clientes.get('/dni/:dni', validateToken, getDNI);

// METHODS CRUD HTTP

clientes.get('/get', getClientes);
clientes.post('/post', postCliente);
clientes.delete('/delete/:id', deleteCliente);
clientes.put('/put/:id', putCliente)

export default clientes;

