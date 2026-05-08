const express = require('express')
const servidor = express()
const port = 3000

/////////////middlewares///////////////
function notificarPeticiones(peticion, respuesta, siguiente){
  console.log("Está llegando una peticion")
  siguiente()
}

function contentTypeMiddleware(peticion, respuesta, siguiente){
  const headers = peticion.headers
  const contentType = headers["content-type"]
  if(contentType === undefined){
    respuesta.status(400).send("Añade content-type a los headers")
  }
  if(contentType === "application/json" || contentType == "text/plain"){
    siguiente()
  }
  else{
    respuesta.sendStatus(415)
  }
}

function authorizationMiddleware(peticion, respuesta, siguiente){
  const authorizationPassword = "1234"
  const headers = peticion.headers
  const authorization = headers["authorization"]
  if(authorization === undefined){
    respuesta.status(400).send("Añade una autorizacion a los headers")
  }
  if(authorization === authorizationPassword){
    siguiente()
  }
  else{
    respuesta.sendStatus(401)
  }

}

//servidor.use(authorizationMiddleware)

servidor.use(notificarPeticiones)
servidor.use(contentTypeMiddleware)
servidor.use(express.json())


///// funciones GET, POST , DELETe, PUT /////////////

estudiantes = ["pepe", "juan", "andrea", "sara"]

function getRedes(peticion, respuesta) {
  headers = peticion.headers
  body = peticion.body
  // console.log(headers)
  console.log(body)
  respuesta.status(200).send("holaaaa!!!")
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


servidor.get("/redes", authorizationMiddleware ,getRedes)
servidor.get("/estudiantes", getEstudiantes)
servidor.post("/redes", postParaRedes)
servidor.post("/estudiantes", postEstudiantes)





/////     inicializacion     ///////////////////
function iniciarServidor() {
  console.log('Servidor escuchando')
}
servidor.listen(port, iniciarServidor)