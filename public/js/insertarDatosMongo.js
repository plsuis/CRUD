// public/js/insertarDatosMongo.js
const { MongoClient } = require('mongodb');


  const url = process.env.URLMONGO;
  const client = new MongoClient(url);
  const database = process.env.BBDD;
  const coleccion = process.env.COLECCION;
  
  async function conectar() {
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Conexión a la base de datos establecida');
    return client.db(database);
  }
  
  async function insertarLibros(db) {
    // Inserción de datos
    conectar();
    await db.collection('libros').insertOne({
      _id: 5,
      titulo: 'Fortran en 30 minutos',
      editorial: ['Siglo XXI'],
      precio: 33,
      cantidade: 2
    });
  
    await db.collection('libros').insertOne({
      _id: 6,
      titulo: 'Las Aventuras del Hidalgo Don Quixote',
      editorial: ['Avanti'],
      precio: 80,
      cantidade: 10
    });
  
    // Mostrar libros actuales en la consola del servidor
    const libros = await db.collection('libros').find().toArray();
    console.log('Libros actuales en la base de datos:', libros);
  }
  
  module.exports = { conectar, insertarLibros };