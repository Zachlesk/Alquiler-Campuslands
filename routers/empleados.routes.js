import { MongoClient,    } from "mongodb";
import { Router } from "express";
import validateToken from '../middlewares/validateJWT.js';
import db from "../connection/connection.js";
import generateJWT from "../helpers/token.js";

import {
    vendedorEmpleado,
    empleadosAdministrativos
} from '../controllers/empleados.js';

import {
    getEmpleados,
    postEmpleado,
    deleteEmpleado,
    putEmpleado
} from '../controllers/empleados.js';


const empleados = Router();
const uri = process.env.MONGO_URI;


// ENDPOINTS

empleados.get('/vendedor', validateToken, vendedorEmpleado)
empleados.get('/administrativos', validateToken, empleadosAdministrativos)
empleados.post('/login',  async (req, res) => {
    const { dni_empleado, contraseña } = req.body
    
    try {
        const collection = db.collection("empleados");
        const dniVerified = await collection.findOne({ dni_empleado });
        if (!dniVerified) {
            return res.status(400).json({
                msg: "Email invalid"
            })
        }

        if (contraseña !== dniVerified.contraseña) {
            return res.json({ msg: "Password invalid" })
        } else if (contraseña === dniVerified.contraseña) {
            const token = await generateJWT(dniVerified._id);
            res.json({
                dniVerified,
                token,
                message: 'User valid'
            })
        }
    } catch (error) {
        console.log(error);
    }
})

// METHODS CRUD HTTP

empleados.get('/get', getEmpleados);
empleados.post('/post', postEmpleado);
empleados.delete('/delete/:id', deleteEmpleado);
empleados.put('/put/:id', putEmpleado);

export default empleados;