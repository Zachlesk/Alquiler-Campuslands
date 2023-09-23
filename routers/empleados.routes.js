import { Router } from "express";
import {
    vendedorEmpleado,
    empleadosAdministrativos
} from '../controllers/empleados.js';

const empleados = Router();

empleados.get('/vendedor', vendedorEmpleado)
empleados.get('/administrativos', empleadosAdministrativos)

export default empleados;