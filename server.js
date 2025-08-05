import express from 'express'
import { createServer } from 'http'
import path from 'path'
import { Server } from 'socket.io'
import {fileURLToPath} from 'url'
import 'dotenv/config'

// ! Variables | Constantes
const app = express()
const PORT = process.env.PORT
const FILENAME = fileURLToPath(import.meta.url)
const DIRNAME = path.dirname(FILENAME)
const variablesEntorno = {
    public_directory: process.env.PUBLIC_DIR
}



const mensajes = [
    { usuario: 'Pedro', mensaje: 'Hola! Que tal!' },
    { usuario: 'Alfredo', mensaje: 'Muy bien y vos?' },
    { usuario: 'Natalia', mensaje: 'Genial!' },
    { usuario: 'Laura', mensaje: 'Todo feten feten'}
]

// ! Configuraciones
// * Agrego la librería socket.io
const server = createServer(app)
const io = new Server(server) // -> es un objeto que tiene varios métodos que nos van a permitir crear un servidor trabajando con websockts

// ! Middleware
app.use(express.static(path.join(DIRNAME, variablesEntorno.public_directory)))
// node.addEventLister('click', () => {})
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado', socket.id) // el dni del cliente que se conecto. Podría no ser único.

    socket.emit('nombre', 'Principe')
    socket.emit('numero-dia-de-la-semana', 222)
    socket.emit('array-ids', [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}])

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
    })

    socket.on('mensaje-desde-cliente', (datos) => {
        console.log(datos)
    })

    // ---------------------- App Chat en Vivo

    socket.emit('mensajes', mensajes)

    socket.on('nuevo-mensaje', newMessage => {
        console.log(newMessage)

        mensajes.push(newMessage)
        io.sockets.emit('mensajes', mensajes)


    })

})


server.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor', err)
    console.log(`Aplicacion funcionando en http://localhost:${PORT}`)
})