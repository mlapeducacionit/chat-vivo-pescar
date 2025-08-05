// Cliente Socket.io

const socket = io.connect() // cliente socket.io
// node.addEventListener('click', () => {})
socket.on('nombre', data => {
    console.log(data)
})
socket.on('numero-dia-de-la-semana', (numero) => {
    console.log(numero)
})
socket.on('array-ids', (array) => {
    console.log(array)
    array.map(dato => {
        console.log(dato);
    })
})
const datosATransmitir = { 
    nombre: 'Maxi', 
    apellido: 'Principe', 
    edad: 22 
}
socket.emit('mensaje-desde-cliente', datosATransmitir)

// -------------- Chat en VIVO

const render = (data) => {

    let html = data.map(msj => {
        return (
            `
            <div>
                <strong>${msj.usuario}</strong>
                <em>${msj.mensaje}</em>
            </div>
            `
        )
    }).join(' ')
    console.log(html)
    document.getElementById('mensajes').innerHTML = html

}

socket.on('mensajes', mensajes => {
    console.log(mensajes)
    render(mensajes)
})

// ! Emitir el mensaje que se cree en el formulario
const chatFormu = document.getElementById('chat-formu')

function agregarMensaje(e) {
    e.preventDefault()
    console.log(e)

    const nombre = e.target[0]
    const mensaje = e.target[1]
    console.log(nombre)
    console.log(mensaje)

    /* const objNuevoMensaje = {
        nombre: nombre.value,
        mensaje: mensaje.value
    } */
    const objNuevoMensaje = {
        [nombre.name]: nombre.value,
        [mensaje.name]: mensaje.value
    }
    console.log(objNuevoMensaje)
    socket.emit('nuevo-mensaje', objNuevoMensaje)

    nombre.value = ''
    mensaje.value = ''


}

chatFormu.addEventListener('submit', agregarMensaje)
