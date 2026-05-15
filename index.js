const { disconnect } = require('cluster')
const express = require('express')
const http = require("http")
const { Server } = require("socket.io")

const servidor = express()
const app  = http.createServer(servidor)
const port = 3000

const sesion = new Server(app)

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

////// sesion ///////////

function onMessage(data){
  console.log(data)
  sesion.emit("respuesta", "hola te estoy respondiendo!")
}

function desconectar(){
  console.log("se ha desconectado: ")
}

function initSesion(cliente){
  console.log("cliente conectado", cliente.id)

  cliente.on("mensaje", onMessage)

  sesion.on("disconnect", desconectar)
}

sesion.on("connection", initSesion )


/////     inicializacion     ///////////////////
function iniciarServidor() {
  console.log('Servidor escuchando')
}
app.listen(port, iniciarServidor)