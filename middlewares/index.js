//middlewares/index.js
const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config();

const URLMONGO = process.env.URLMONGO;
const BBDD = process.env.BBDD;
const COLECCION = process.env.COLECCION;


const { fLerDatos } = require("./lerDatos.js");
const { fBorrarDatos } = require("./borrarDatos.js");
const { fActualizarDatos } = require("./actualizarDatos.js")

module.exports = { 
    fLerDatos,
    fBorrarDatos,
    fActualizarDatos
 };