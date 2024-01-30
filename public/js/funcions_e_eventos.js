import { eventosEGB,seleccionTarefaARealizar } from "./helpers.js";

function preparandoDatos(datos) {
  //No map de datos.documentos.map ==> recorremos todos os datos que nos chegan da BBDD
    datos.documentos.map((documento) => {

      //console.log("documento: ",documento)

    let _div = document.createElement("div");
    _div.setAttribute("id",`${documento._id}`);
    document.querySelector(".lista").append(_div);
    let _input = document.createElement("input");
    _input.setAttribute("readonly","true")
    _input.setAttribute("value",`${documento._id}`)
    //para comprobar, sacamos o documento por consola:
    //console.log('documento: ',documento._id,documento);
    let tamanhio = Object.keys(documento).length;
    let elementos = Object.values(documento);
    /* console.log('elmentos: ',elementos)
    console.log('As claves do obxeto documento: ',Object.keys(documento)) */
    let claves = Object.keys(documento) // Claves para o introducir o atributo 'name'= valor

    //Este for realiza o recorrido dos valores da bbdd

    for (let contador = 0; contador < tamanhio; contador++) {
      let _input2 = document.createElement("input");
      _input2.setAttribute("readonly","true")
      _input2.setAttribute("name",`${claves[contador]}`)
      _input2.setAttribute("value",`${elementos[contador]}`)
      if (Array.isArray(elementos[contador])) {
        // bucle sobre o array
        for (let contador2 = 0; contador2 < elementos[contador].length; contador2++) {
            let _input3 = document.createElement("input")
            _input3.setAttribute("readonly","true")
           //console.log("dentro: ", elementos[contador][contador2]);
            _input3.innerHTML += elementos[contador][contador2];
            _input2.append(_input3);
        }
      }
      _input2.innerHTML += elementos[contador];
    //   console.log('dentro fora: ',_input2)
      _div.append(_input2);
    }


    let imax = ["borrar", "editar", "guardar"];
    for(let imaxenes of imax) {

      let imx = document.createElement("img");
      
      imx.setAttribute("src", `./assets/${imaxenes}.png`);
      imx.setAttribute("class", `${imaxenes}`);
      _div.append(imx);
    }


    //document.querySelector(".")
    
});//datos.documentos.map

      let _divInterno = document.querySelector("div");

      _divInterno.addEventListener('click', () => {

        /*let refTodosEditar = document.querySelectorAll('.editar');
        let refTodosGardar = document.querySelectorAll('.guardar');*/
        let refTodosBorrar = document.querySelectorAll('.borrar');
        
        /*eventosEGB(refTodosEditar);
        eventosEGB(refTodosGardar);*/
        eventosEGB(refTodosBorrar);

      })//addEventListener _div interno

      let _inputs = document.querySelectorAll('input')
      
      let nomes = []
      for(let _input of _inputs){
        _input.addEventListener("click",(e)=>{
         
          e.target.removeAttribute("readonly")
          nomes[0] = e.target.parentElement.getAttribute("id")
          nomes.push(e.target.getAttribute("name"))
          e.target.style.backgroundColor = "blue";
          e.target.style.color = "white";
        })
      }
    
      let _imxsGuardar = document.querySelectorAll('.guardar')
      let dato = {
        id:0,
        campos:{}
      }// inicializo dato
      
      /**
       * for clave na preparación do dato para gardar o elemento de maneira individual
       * utiliza as variables dato e _imxGuardar.
       * 
       * No seu interior xenera o evento click, da imaxe 'guardar'
       */
      for(let contador = 0; contador < _imxsGuardar.length; contador ++){
        _imxsGuardar[contador].addEventListener("click",(e)=>{
          
          let idPulsado = e.target.parentElement.getAttribute('id')
          if(idPulsado == nomes[0]){
            
            let _inputArray = e.target.parentElement.querySelectorAll('input');//contén os campos dos elementos input do div clicado
            let tamanaioDiv = e.target.parentElement.querySelectorAll('input').length;
            let contador = 0;
            let tamanioNomes = nomes.length;
            
            for(contador;contador < tamanaioDiv; contador++){
              let contadorNomes = 1;
              /* console.log('nomes: ',nomes[contador],'contador fora: ',contador) */

              for(contadorNomes; contadorNomes < tamanioNomes ;contadorNomes++){
               
                  let atributoName = _inputArray[contador].getAttribute(`name`);
                  let atributoModificado = nomes[contadorNomes];
                /*console.log('nomes[contadorNomes]: ',nomes[contadorNomes])  */
                if(atributoName == atributoModificado){
                   console.log('atributoName ',atributoName)
                  console.log('atributoModificado ',atributoModificado)
                  console.log('idPulsado: ',idPulsado)
                  console.log('_inputArray[contador].value ',_inputArray[contador].value) 
                  //dato[`${atributoName}`] = _inputArray[contador].value;
                  dato.campos[`${atributoName}`] = _inputArray[contador].value;
                  dato.id = idPulsado
                }
              }
             

            }
            

            console.log('dato: ',dato)
            //Agora enviamos o datos o back
            seleccionTarefaARealizar(dato.id,'actualizar',dato)
          }
        })
      }//for clave na preparación do dato para gardar o elemento de maneira individual

     

}//preparandoDatos(datos)

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
