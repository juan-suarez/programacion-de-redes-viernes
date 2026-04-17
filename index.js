const express = require('express')
const servidor = express()
const port = 3000

// servidor.get('/', (req, res) => {
//   console.log('Recibí una solicitud GET en la raíz')  
//   res.send('Hola mundo!')
// })

// servidor.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
function iniciarServidor() {
  console.log('Servidor escuchando')  
}

function getRedes(peticion, respuesta){
    console.log("esta es la ruta redes!!!")
    respuesta.send("Estas en la ruta redes")
}

servidor.get("/redes",getRedes)

servidor.listen(port, iniciarServidor)