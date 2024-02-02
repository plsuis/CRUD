// Creamos los elementos de la página
import {crearDiv, crearInputReadOnly, agregarArrayInputs, crearImagen} from "./creardom.js"
// Agregamos eventos a las imagenes de Borrar, Guardar, Editar
import { agregarEventosBorrar, agregarEventosGuardar, agregarEventosInputs, agregarEventosEditar} from "./eventos.js"
//import { eventosEGB } from "./helpers.js";



/* 
Esta función se encarga de preparar los datos recibidos (datosJson) y crear elementos en el DOM para cada documento.
Utiliza funciones importadas (crearDiv, crearInputReadOnly, agregarArrayInputs, crearImagen) para construir los elementos del DOM.
Recorre los documentos, crea elementos para cada propiedad y agrega eventos a los botones "borrar", "guardar" y "editar".
Guarda referencias a los inputs (_inputs) y a un contenedor interno (_divInterno).
*/
function prepararInputs(documento) {
  const claves = Object.keys(documento);
  const elementos = Object.values(documento);
  const inputs = [];

  for (let contador = 0; contador < elementos.length; contador++) {
    const input = crearInputReadOnly(claves[contador], elementos[contador]);
    if (Array.isArray(elementos[contador])) {
      agregarArrayInputs(input, elementos[contador]);
    }
    inputs.push(input);
  }

  return inputs;
}

function agregarBotones(div) {
  const imax = ["borrar", "editar", "guardar"];
  for (let imaxenes of imax) {
    const imx = crearImagen(imaxenes);
    div.append(imx);
  }
}

function preparandoDatos(datos) {
  datos.documentos.forEach((documento) => {
    const div = crearDiv(documento);
    const inputs = prepararInputs(documento);

    inputs.forEach((input) => {
      div.append(input);
    });

    agregarBotones(div);

    const _inputs = document.querySelectorAll("input");
    const nomes = [];

    agregarEventosBorrar(div.querySelectorAll(".borrar"));
    //agregarEventosInputs(_inputs, nomes);
    agregarEventosGuardar(div.querySelectorAll(".guardar"), _inputs, nomes);
    agregarEventosEditar(div.querySelectorAll(".editar"));
  });
}

// Luego, puedes llamar a la función preguntarDatos como antes:
async function preguntarDatos() {
  let datosLeidos = await fetch("/lecturadatos");
  let datosJson = await datosLeidos.json();
  preparandoDatos(datosJson);
  let _imxsEditar = document.querySelectorAll('.editar')
  console.log(_imxsEditar);

}

export { preguntarDatos };