import { eventosEGB } from "./helpers.js";
/*Función preparandoDatos :

Esta función recibe un objeto datos que presumiblemente contiene información de documentos recuperados de MongoDB.
Itera sobre los documentos y crea elementos <div> y <span> para cada uno.
Por cada propiedad en un documento, crea un <span> para mostrar el valor. Si la propiedad es un array, también crea sub-elementos <span> para cada elemento del array.
Después, crea imágenes <img> para representar las acciones "borrar", "editar" y "guardar" y las agrega al <div>.
Por último, agrega un evento click al contenedor principal que captura los clics en cualquier parte del contenedor.
*/


function preparandoDatos(datos) {
  // datos.documentos.map recorre todos os datos que nos chegan da BBDD
    datos.documentos.map((documento) => {

      console.log("documento: ", documento)

    let _div = document.createElement("div");
    _div.setAttribute("id",`${documento._id}`);
    document.querySelector(".lista").append(_div);
    let _span = document.createElement("span");
    //para comprobar, sacamos o documento por consola:
    //console.log('documento: ',documento._id,documento);
    let tamanhio = Object.keys(documento).length;
    let elementos = Object.values(documento);
      console.log('elementos: ',elementos)
      console.log('As claves do obxeto documento: ',Object.keys(documento))
    for (let contador = 0; contador < tamanhio; contador++) {
      let _span2 = document.createElement("span");
      //_span2:setAttribute("name",)
      if (Array.isArray(elementos[contador])) {
        // bucle sobre o array
        for (let contador2 = 0; contador2 < elementos[contador].length; contador2++) {
            let _span3 = document.createElement("span")
        //   console.log("dentro: ", elementos[contador][contador2]);
            _span3.innerHTML += elementos[contador][contador2];
            _span2.append(_span3);
        }
      }
      _span2.innerHTML += elementos[contador];
    //   console.log('dentro fora: ',_span2)
      _div.append(_span2);
    }
    let imax = ["borrar", "editar", "guardar"];
    for(let imaxenes of imax) {

      let imx = document.createElement("img");
      
      imx.setAttribute("src", `./assets/${imaxenes}.png`);
      imx.setAttribute("class", `${imaxenes}`);
      _div.append(imx);
    }
    //document.querySelector(".")
    
});
/* Elementos y Eventos:

Cada documento se representa como un <div> que contiene información en elementos <span> y acciones en imágenes <img>.
Se utilizan imágenes para representar las acciones de "borrar", "editar" y "guardar".
El código está configurado para capturar clics en cualquier parte del contenedor principal (_divInterno) y manejar eventos según la clase de la imagen clicada (borrar, editar, guardar).
*/


      let _divInterno = document.querySelector("div");

      _divInterno.addEventListener('click', () => {

        let refTodosEditar = document.querySelectorAll('.editar');
        let refTodosGardar = document.querySelectorAll('.guardar');
        let refTodosBorrar = document.querySelectorAll('.borrar');
        
/* Helper Function eventosEGB:

Se espera que exista una función llamada eventosEGB en el archivo helpers.js. Sin conocer su implementación exacta, parece ser una función para manejar eventos relacionados con "editar", "guardar" y "borrar".
*/
        eventosEGB(refTodosEditar);
        eventosEGB(refTodosGardar);
        eventosEGB(refTodosBorrar);

      })//_div interno
}

/* document.querySelectorAll[0].addEventListener("click",(e) => {
    console.log("hola", e.target)
}) */

/*preguntarDatos Function:

Hace una solicitud asíncrona al servidor para obtener datos utilizando fetch("/lecturadatos").
Convierte la respuesta a formato JSON.
Llama a la función preparandoDatos para procesar los datos recibidos.
*/


async function preguntarDatos() {
//   console.log("hola");
  let datosLeidos = await fetch("/lecturadatos");
  let datosJson = await datosLeidos.json();

  preparandoDatos(datosJson);
}

export { preguntarDatos };
