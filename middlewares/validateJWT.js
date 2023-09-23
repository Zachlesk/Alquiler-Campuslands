import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import db from "../connection/connection.js";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const empleados = db.collection('empleados');

const validateToken = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        await client.connect();
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const empleados = await empleados.find({ _id: new ObjectId(uid) }).toArray();
        client.close();
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

export default validateToken;