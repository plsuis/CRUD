require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");

//Utilizamos as funcións utilizadas para mongodb

const { fLerDatos, fBorrarDatos, fActualizarDatos } = require("./middlewares/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "public")));


// Establecer os endpoints do BACKEND
app.get("/lecturadatos", fLerDatos);
app.delete("/borradodatos/:id", fBorrarDatos);
app.post("/actualizardatos/:id", fActualizarDatos);
//app.delete("/borradodatos",fBorrarDatos)

//app.put("/modificadodatos",fEditarDatos)

//INICIAR SERVIDOR
// GUSTAME MAIS O PORTO 4300 QUE O 4000
app.listen(4300, function() {
  console.log("Server running");
});