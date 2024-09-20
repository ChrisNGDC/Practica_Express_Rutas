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

//  LENGUAJES

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
            return res.status(404).send(`No se encontró el curso con cantidad de alumnos mayor o igual a: ${cantidadAlumnos}`)
        }
        res.status(200).send(JSON.stringify(filtrado));
    } else {
        res.send(JSON.stringify(infoLenguajes));
    }
})

//  FRONTEND AND BACKEND

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
        return res.status(404).send(`No se encontró el curso con los parametros dados.`)
    }
    res.status(200).send(JSON.stringify(filtrado));
})

//  SERVER RUN

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});
