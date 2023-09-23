import { MongoClient,    } from "mongodb";
import { Router } from "express";
import generateJWT from "../helpers/token.js";
import {
    vendedorEmpleado,
    empleadosAdministrativos
} from '../controllers/empleados.js';

const empleados = Router();
const uri = process.env.MONGO_URI;

empleados.get('/vendedor', vendedorEmpleado)
empleados.get('/administrativos', empleadosAdministrativos)
empleados.post('/login', async (req, res) => {
    const { dni_empleado, contraseña } = req.body
    
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection("empleados");
        const dniVerified = await collection.findOne({ dni_empleado });
        if (!existeDNI) {
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
        await client.close();
    } catch (error) {
        console.log(error);
    }
})

export default empleados;