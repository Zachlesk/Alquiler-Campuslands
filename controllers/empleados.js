import db from "../connection/connection.js";

const empleados = db.collection('empleados');

export async function vendedorEmpleado(req, res) {
    try {
        const results = await empleados.find({cargo_empleado: 'Vendedor'}).toArray();
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}

export async function empleadosAdministrativos(req, res) {
    try {
        const results = await empleados.find({$or: [{cargo_empleado: 'Gerente'}, {cargo_empleado: 'Asistente'}]}).toArray(); 
        res.status(302).send(results)
    } catch (error) {
        console.error(error)
    }
}