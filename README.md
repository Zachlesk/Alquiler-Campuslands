# Alquiler-Campuslands 🚗

Esta plataforma ha sido desarrollada utilizando las tecnologías de **Node.js, Express y MongoDB**, y está diseñada para ofrecer una gestión eficiente y bien organizada de alquileres de vehículos.



## Indicatorios


1. [¿Cómo usar el sistema?](#cómo-utilizar-el-software)

2. [Endpoints](#rutas)
- [Alquiler](#alquiler)
- [Automóviles](#automóviles)
- [Clientes](#clientes)
- [Empleados](#empleados)
- [Reservas](#reservas)
- [Sucursal Automóvil](#sucursal-automóvil)



<br>

## ¿Cómo usar el sistema? 💻

Para poder usar este sistema en tu computador, tendrás que instalarlo y utilizarlo localmente, y necesitarás tener instalados los siguientes requisitos:


<div align="center"> Node.js 🚀 </div>
<br>


Para poder instalarlo, sigue los siguientes pasos:

1. Clona el repositorio: `https://github.com/Zachlesk/Alquiler-Campuslands.git`
`

2. Desde la terminal e instala las dependencias con el siguiente comando:

    ```bash
    npm update
    ```

3. Una vez instaladas las dependencias vamos a abrir una nueva terminal y ejecutamos el software:

    ```bash
    npm run zach
    ```

4. En la consola, visualizarás el siguiente mensaje: 
    ```bash
    Server is running on port ${PORT}
    ```
<br>
-> ¡Listo! Tu servidor está en funcionamiento.

<hr>

## Rutas 🔗

Ya tenemos corriendo nuestro servidor, pero ¿cómo ingresamos a la información almacenada en nuestra base de datos?. Pues aquí está la explicación de como ingresar a cada una de ellas:

<br>

## Alquileres

- `http://localhost/8020/alquileres/disponibles` 👍 : Obtener todos los automóviles disponibles para alquiler.
- `http://localhost/8020/alquileres/activos` 👤 : Listar todos los alquileres activos junto con los datos de los clientes relacionados.
- `http://localhost/8020/alquileres/detalles/:id` 📑 : Obtener los detalles del alquiler con el ID_Alquiler específico.
- `http://localhost/8020/alquileres/costo/:id` 📈 : Obtener el costo total de un alquiler específico.
- `http://localhost/8020/alquileres/fecha` 📆 : Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'
- `http://localhost/8020/alquileres/datos` 👨‍💻: Obtener los datos de los clientes que realizaron al menos un alquiler.
- `http://localhost/8020/alquileres/cantidad` 📶 : Obtener la cantidad total de alquileres registrados en la base de datos. 
- `http://localhost/8020/alquileres/capacidad` 🆓 : Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
- `http://localhost/8020/alquileres/mediana` 🚘 : Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.

  <br>

## Automoviles

- `http://localhost/8020/automoviles/capacidad` 5️⃣: Mostrar todos los automóviles con una capacidad mayor a 5
personas.

- `http://localhost/8020/automoviles/ordenar` 🚨: Listar todos los automóviles ordenados por marca y modelo.

  <br>

## Clientes

- `http://localhost/8020/clientes` 🧑‍🤝‍🧑: Consulta a todos los clientes.
- `http://localhost/8020/clientes/dni/:dni` 🪪: Listar los clientes con el DNI específico.

  <br>

## Empleados

- `http://localhost:8020/empleados/vendedor` 💲: Listar los empleados con el cargo de "Vendedor".
- `http://localhost:8020/empleados/administrativos` 👑: Mostrar los empleados con cargo de "Gerente" o "Asistente".

  <br>

## Reservas

- `http://localhost/8020/reservas/pendientes` ✒️: Mostrar todas las reservas pendientes con los datos del cliente
y el automóvil reservado.
- `http://localhost/8020/reservas/cliente` 📍:  Listar las reservas pendientes realizadas por un cliente específico.
- `http://localhost/8020/reservas/reservacion` 🧑‍🎓: Obtener los datos del cliente que realizó la reservación.

  <br>

## Sucursal

- `http://localhost/8020/sucursal/disponibles` ✅: Mostrar la cantidad total de automóviles disponibles en cada sucursal.
- `http://localhost/8020/sucursal/direccion` 🏠: Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.

  <br>
  
  
  

### Contribuciones 

¡Agradecemos tus contribuciones al proyecto! Si deseas colaborar, sigue los siguientes pasos:

1. Crea un nuevo "branch" para tus cambios.

   ```shell
   git checkout -b mi-nueva-funcionalidad    
   ```

2. Realiza tus modificaciones y mejoras.

3. Haz un "commit" de tus cambios.

   ```shell
   git commit -m "Agrego nueva funcionalidad"      
   ```

4. Envía tus cambios al repositorio remoto.

   ```shell
   git push origin mi-nueva-funcionalidad    
   ```

4. Abre un "**Pull Request**" en GitHub para que revisemos tus cambios.

¡Gracias por contribuir al proyecto "Alquiler-Campuslands"! 