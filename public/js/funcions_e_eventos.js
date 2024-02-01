//import e from "cors";
//import { eventosEGB } from "./helpers.js";
/*Función preparandoDatos :

Esta función recibe un objeto datos que presumiblemente contiene información de documentos recuperados de MongoDB.
Itera sobre los documentos y crea elementos <div> y <span> para cada uno.
Por cada propiedad en un documento, crea un <span> para mostrar el valor. Si la propiedad es un array, también crea sub-elementos <span> para cada elemento del array.
Después, crea imágenes <img> para representar las acciones "borrar", "editar" y "guardar" y las agrega al <div>.
Por último, agrega un evento click al contenedor principal que captura los clics en cualquier parte del contenedor.
*/

function crearDiv(documento) {
  const _div = document.createElement("div");
  _div.setAttribute("id", `${documento._id}`);
  document.querySelector(".lista").append(_div);
  return _div;
}

function crearInputReadOnly(name, value) {
  const _input = document.createElement("input");
  _input.setAttribute("readonly", "true");
  _input.setAttribute("name", name);
  _input.setAttribute("value", value);
  return _input;
}

function agregarArrayInputs(_input, array) {
  for (let contador2 = 0; contador2 < array.length; contador2++) {
    const _input3 = document.createElement("input");
    _input3.setAttribute("readonly", "true");
    _input3.innerHTML += array[contador2];
    _input.append(_input3);
  }
}

function crearImagen(imagenClass) {
  const imx = document.createElement("img");
  imx.setAttribute("src", `./assets/${imagenClass}.png`);
  imx.setAttribute("class", `${imagenClass}`);
  return imx;
}

function agregarEventosBorrar(refTodosBorrar) {
  refTodosBorrar.forEach((elemento) => {
    elemento.addEventListener("click", () => {
      // Lógica para borrar
      console.log("Borrar:", elemento.parentElement.getAttribute("id"));
    });
  });
}

function agregarEventosInputs(_inputs, nomes) {
  _inputs.forEach((_input) => {
    _input.addEventListener("focus", (e) => {
      e.target.removeAttribute("readonly");
      nomes[0] = e.target.parentElement.getAttribute("id");
      nomes.push(e.target.getAttribute("name"));
      e.target.style.backgroundColor = "lightblue";
    });

    _input.addEventListener("blur", (e) => {
      // Revertir los cambios cuando se pierde el foco
      e.target.setAttribute("readonly", true);
      e.target.style.backgroundColor = "";
    });
  });
}

function agregarEventosGuardar(_imxsGuardar, _inputs, nomes) {
  _imxsGuardar.forEach((elemento) => {
    elemento.addEventListener("click", async (e) => {
      const idPulsado = e.target.parentElement.getAttribute("id");
      if (idPulsado == nomes[0]) {
        // Obtener los valores de los inputs
        const values = [];
        _inputs.forEach((_input) => {
          values.push(_input.value);
        });

        // Crear un objeto con los valores de los inputs
        const datosAActualizar = {};
        nomes.forEach((nombre, index) => {
          datosAActualizar[nombre] = values[index];
        });

        // Hacer la solicitud POST al servidor
        try {
          const respuesta = await fetch(`/actualizardatos/${idPulsado}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              datos: datosAActualizar,
            }),
          });

          if (respuesta.ok) {
            console.log("Datos actualizados con éxito.");
            // Puedes hacer algo adicional si la actualización es exitosa
          } else {
            console.error("Error al actualizar datos.");
            // Puedes manejar errores aquí
          }
        } catch (error) {
          console.error("Error de red:", error);
          // Puedes manejar errores de red aquí
        }
      }
    });
  });
}

function preparandoDatos(datos) {
  // Recorremos todos los datos que nos llegan de la BBDD
  datos.documentos.map((documento) => {
    const _div = crearDiv(documento);
    const _input = crearInputReadOnly("_id", documento._id);

    // Este for realiza el recorrido de los valores de la BBDD    
    const claves = Object.keys(documento);
    const elementos = Object.values(documento);
    const tamanhio = Object.keys(documento).length;



    for (let contador = 0; contador < tamanhio; contador++) {
      const _input2 = crearInputReadOnly(claves[contador], elementos[contador]);
      if (Array.isArray(elementos[contador])) {
        agregarArrayInputs(_input2, elementos[contador]);
      }
      _div.append(_input2);
    }

    const imax = ["borrar", "editar", "guardar"];
    for (let imaxenes of imax) {
      const imx = crearImagen(imaxenes);
      _div.append(imx);
    }

    const _inputs = document.querySelectorAll("input");
    const nomes = [];



    const _divInterno = document.querySelector("div");
    agregarEventosBorrar(document.querySelectorAll(".borrar"));
    //agregarEventosInputs(_inputs, nomes);
    agregarEventosGuardar(document.querySelectorAll(".guardar"), _inputs, nomes);
    agregarEventosEditar(document.querySelectorAll(".editar"));

  });

}//preparandoDatos(datos)

// Luego, puedes llamar a la función preguntarDatos como antes:
async function preguntarDatos() {
  let datosLeidos = await fetch("/lecturadatos");
  let datosJson = await datosLeidos.json();
  preparandoDatos(datosJson);
  let _imxsEditar = document.querySelectorAll('.editar')
  console.log(_imxsEditar);

}

function agregarEventosEditar(_imxsEditar, _inputs) {
  _imxsEditar.forEach((elemento) => {
    elemento.addEventListener("click", async (e) => {
      
      const inputsTotales = e.target.parentElement.parentElement.querySelectorAll("input");
      inputsTotales.forEach((input) => {
        input.setAttribute("readonly", true);
        input.style.backgroundColor = "";
        input.style.color = "";
      })

      const inputsParent = e.target.parentElement.querySelectorAll("input");

      inputsParent.forEach((input) => {
        input.removeAttribute('readonly');
        input.style.backgroundColor = "lightgreen";
        input.style.color = 'red';
      });
    });

  });

}

export { preguntarDatos };