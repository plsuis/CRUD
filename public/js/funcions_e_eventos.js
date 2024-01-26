import { eventosEGB } from "./helpers.js";

function preparandoDatos(datos) {
    datos.documentos.map((documento) => {
    let _div = document.createElement("div");
    _div.setAttribute("id",`${documento._id}`);
    document.querySelector(".lista").append(_div);
    let _span = document.createElement("span");
    //para comprobar, sacamos o documento por consola:
    //console.log('documento: ',documento._id,documento);
    let tamanhio = Object.keys(documento).length;
    let elementos = Object.values(documento);

    for (let contador = 0; contador < tamanhio; contador++) {
      let _span2 = document.createElement("span");

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

      let _divInterno = document.querySelector("div");

      _divInterno.addEventListener('click', () => {

        let refTodosEditar = document.querySelectorAll('.editar');
        let refTodosGardar = document.querySelectorAll('.guardar');
        let refTodosBorrar = document.querySelectorAll('.borrar');
        
        eventosEGB(refTodosEditar);
        eventosEGB(refTodosGardar);
        eventosEGB(refTodosBorrar);

      })//_div interno
}

/* document.querySelectorAll[0].addEventListener("click",(e) => {
    console.log("hola", e.target)
}) */


async function preguntarDatos() {
//   console.log("hola");
  let datosLeidos = await fetch("/lecturadatos");
  let datosJson = await datosLeidos.json();

  preparandoDatos(datosJson);
}

export { preguntarDatos };
