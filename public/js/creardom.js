
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
  
export {crearDiv, crearInputReadOnly, agregarArrayInputs, crearImagen}  