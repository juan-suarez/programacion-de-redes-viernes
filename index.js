const express = require('express')
const servidor = express()
const port = 3000

/////////////middlewares///////////////
function notificarPeticiones(peticion, respuesta, siguiente){
  console.log("Está llegando una peticion")
  siguiente()
}

servidor.use(notificarPeticiones)
servidor.use(express.json())

///// funciones GET, POST , DELETe, PUT /////////////

estudiantes = ["pepe", "juan", "andrea", "sara"]

function getRedes(peticion, respuesta) {
  headers = peticion.headers
  body = peticion.body
  // console.log(headers)
  console.log(body)
  respuesta.status(200).json(headers)
}

function postParaRedes(peticion, respuesta) {
  console.log("peticion POST en la ruta redes")
  respuesta.send("Peticion POST en ruta redes recibida!!")
}

function getEstudiantes(peticion, respuesta) {
  console.log("peticion POST en la ruta redes")
  respuesta.json(estudiantes)
}

function postEstudiantes(peticion, respuesta){
  body = peticion.body
  nombre = body.nombre

  estudiantes.push(nombre)
  respuesta.status(201).send("El estudiante fue añadido a la lista")
}


servidor.get("/redes", getRedes)
servidor.get("/estudiantes", getEstudiantes)
servidor.post("/redes", postParaRedes)
servidor.post("/estudiantes", postEstudiantes)



/////     inicializacion     ///////////////////
function iniciarServidor() {
  console.log('Servidor escuchando')
}
servidor.listen(port, iniciarServidor)