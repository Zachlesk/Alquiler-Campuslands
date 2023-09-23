import { Router } from "express";
import {
    automovilesSucursal,
    cantidadTotalSucursal
} from '../controllers/sucursal.js'

const sucursal = Router();

sucursal.get('/disponibles', automovilesSucursal);
sucursal.get('/direccion', cantidadTotalSucursal);

export default sucursal;