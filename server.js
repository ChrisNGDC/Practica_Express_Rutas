// SERVER CONFIG

const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

// DATA

const { infoLenguajes } = require('./src/lenguajesFrontBack');

//  ROOT

app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo! Bienvenido al server con express!</h1>')
})

//  API

app.get('/api', (req, res) => {
    console.log("entrando a api")
    res.send('<h1> ENTRANDO EN /API</h1>')
})

//  LENGUAJES QUERY PARAMS

app.get('/api/lenguajes', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const cantidadAlumnos = req.query.cantAlumnos;

    if (cantidadAlumnos) {
        const filtradoBackend = infoLenguajes.backend.filter(
            lenguajes => lenguajes.cantidadAlumnos >= Number(cantidadAlumnos)
        )
        const filtradoFrontend = infoLenguajes.frontend.filter(
            lenguajes => lenguajes.cantidadAlumnos >= Number(cantidadAlumnos)
        )
        const filtrado = filtradoFrontend.concat(filtradoBackend);
        if (!filtrado) {
            return res.status(404).send(`No se encontraron cursos con cantidad de alumnos mayor o igual a: ${cantidadAlumnos}`)
        }
        res.status(200).send(JSON.stringify(filtrado));
    } else {
        res.send(JSON.stringify(infoLenguajes));
    }
})

// LENGUAJES URL PARAMS

app.get('/api/lenguajes/:cantAlumnos', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const cantidadAlumnos = req.params.cantAlumnos;

    const filtradoBackend = infoLenguajes.backend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= Number(cantidadAlumnos)
    )
    const filtradoFrontend = infoLenguajes.frontend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= Number(cantidadAlumnos)
    )
    const filtrado = filtradoFrontend.concat(filtradoBackend);
    if (!filtrado) {
        return res.status(404).send(`No se encontraron cursos con cantidad de alumnos mayor o igual a: ${cantidadAlumnos}`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

//  FRONTEND AND BACKEND QUERY PARAMS

app.get('/api/lenguajes/:technology', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const technology = req.params.technology;
    const lenguaje = req.query.nombre;
    const turno = req.query.turno;
    const cantidadAlumnos = req.query.cantAlumnos;
    let filtrado;

    switch (technology) {
        case 'frontend':
            filtrado = infoLenguajes.frontend;
            break;
        case 'backend':
            filtrado = infoLenguajes.backend;
            break;
        default:
            return res.status(404).send(`No se encontraron cursos de: ${technology}`)
    }

    if (lenguaje) {
        filtrado = filtrado.filter(
            lenguajes => lenguajes.nombre.toLocaleLowerCase() == lenguaje.toLocaleLowerCase()
        )
    }
    if (turno) {
        filtrado = filtrado.filter(
            lenguajes => lenguajes.turno.toLocaleLowerCase() == turno.toLocaleLowerCase()
        )
    }
    if (cantidadAlumnos) {
        console.log(cantidadAlumnos);
        filtrado = filtrado.filter(
            lenguajes => lenguajes.cantidadAlumnos >= Number(cantidadAlumnos)
        )
    }

    if (!filtrado) {
        return res.status(404).send(`No se encontró cursos con los parametros dados.`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

//  FRONTEND URL PARAMS

app.get('/api/lenguajes/frontend/nombre/:lenguaje', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const lenguaje = req.params.lenguaje;
    let filtrado = infoLenguajes.frontend;

    filtrado = filtrado.filter(
        lenguajes => lenguajes.nombre.toLocaleLowerCase() == lenguaje.toLocaleLowerCase()
    )

    if (!filtrado) {
        return res.status(404).send(`No se encontró cursos con el lenguaje "${lenguaje}".`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

app.get('/api/lenguajes/frontend/turno/:turno', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const turno = req.params.turno;
    let filtrado = infoLenguajes.frontend;

    filtrado = filtrado.filter(
        lenguajes => lenguajes.turno.toLocaleLowerCase() == turno.toLocaleLowerCase()
    )

    if (!filtrado) {
        return res.status(404).send(`No se encontró cursos con el turno "${turno}".`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

app.get('/api/lenguajes/frontend/cantidadAlumnos/:cantidad', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const cantidad = req.params.cantidad;
    let filtrado = infoLenguajes.frontend;

    filtrado = filtrado.filter(
        lenguajes => lenguajes.cantidad == Number(cantidad)
    )

    if (!filtrado) {
        return res.status(404).send(`No se encontró cursos con cantidad de alumnos igual o mayor a "${cantidad}".`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

//  BACKEND URL PARAMS

app.get('/api/lenguajes/backend/nombre/:lenguaje', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const lenguaje = req.params.lenguaje;
    let filtrado = infoLenguajes.backend;

    filtrado = filtrado.filter(
        lenguajes => lenguajes.nombre.toLocaleLowerCase() == lenguaje.toLocaleLowerCase()
    )

    if (!filtrado) {
        return res.status(404).send(`No se encontró cursos con el lenguaje "${lenguaje}".`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

app.get('/api/lenguajes/backend/turno/:turno', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const turno = req.params.turno;
    let filtrado = infoLenguajes.backend;

    filtrado = filtrado.filter(
        lenguajes => lenguajes.turno.toLocaleLowerCase() == turno.toLocaleLowerCase()
    )

    if (!filtrado) {
        return res.status(404).send(`No se encontró cursos con el turno "${turno}".`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

app.get('/api/lenguajes/backend/cantidadAlumnos/:cantidad', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const cantidad = req.params.cantidad;
    let filtrado = infoLenguajes.backend;

    filtrado = filtrado.filter(
        lenguajes => lenguajes.cantidad == Number(cantidad)
    )

    if (!filtrado) {
        return res.status(404).send(`No se encontró cursos con cantidad de alumnos igual o mayor a "${cantidad}".`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

//  SERVER RUN

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});
