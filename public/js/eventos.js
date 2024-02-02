
function agregarEventosBorrar(refTodosBorrar) {
    refTodosBorrar.forEach((elemento) => {
      elemento.addEventListener("click", () => {
        // Lógica para borrar
        console.log("Borrar:", elemento.parentElement.getAttribute("id"));
      });
    });
  }
  
  // funcion de inputs antigua (no usada)
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

  export { agregarEventosBorrar, agregarEventosGuardar, agregarEventosInputs, agregarEventosEditar}