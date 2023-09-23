import dotenv from 'dotenv';
import express from 'express';

import clientes from './routers/clientes.routes.js';
import alquileres from './routers/alquileres.routes.js'
import reservas from './routers/reservas.routes.js';
import empleados from './routers/empleados.routes.js';
import sucursal from './routers/sucursal.routes.js';
import automovil from './routers/automovil.routes.js';

console.clear();
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/clientes", clientes)
app.use("/alquileres", alquileres)
app.use("/reservas", reservas)
app.use("/empleados", empleados)
app.use("/sucursal", sucursal)
app.use("/automovil", automovil)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });