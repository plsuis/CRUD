// middlewares/borrarDatos.js
require('dotenv').config();
const { MongoClient } = require("mongodb");
const url = process.env.URLMONGO;
const client = new MongoClient(url);
const database = process.env.BBDD;
const coleccion = process.env.COLECCION;

async function fActualizarDatos(req,res){
    
     try {
        await client.connect();

        // BBDD y coleccion van aqui
        const { id } = req.params;
        const db = client.db(database);
        const coll = db.collection(coleccion);
        //console.log('tipo id: ', typeof id)
         const dato = {
            _id: parseInt(id)
        }

        const result = await coll.updateOne(filtro,dato);
        console.log('Resuldato de actualizado de dato',result) 
        
        let datosACliente = {
            mensaxe: "chega a fActualizarDatos"
        }
        res.send(datosACliente)
    } finally {
        //asegurar q el cliente cierra cuando acaba/error
        await client.close();

  
    } 
}
module.exports = {fActualizarDatos};
