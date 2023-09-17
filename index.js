import dotenv from 'dotenv';
import express from 'express';

import clientes from './routers/clientes.routes.js';

console.clear();
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/clientes", clientes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });