import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let cnx = undefined

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

    try {
        cnx = await client.connect();
        console.log("¡Haz sido conectado a la base de datos!")
    } catch (error) {
        console.error(error)
    }


const db = cnx.db('alquiler-campuslands');

export default db;