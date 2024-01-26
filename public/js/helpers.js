import { _servindoOServer } from "./comunicacion/with_server.js";
function seleccionTarefaARealizar(id,tarefaArealizar){
    let metodo = "";
    let endpoint = "";
    /* if(tarefaArealizar === 'guardar'){
        metodo = "PUT";
        //endpoint 
    } */
    if(tarefaArealizar === 'borrar'){
        
        metodo = 'DELETE';
        endpoint = 'borradodatos'
    }
   
    _servindoOServer(id,metodo,endpoint)
}


function eventosEGB(refLista){
    
    for(let refElemento of refLista){
        refElemento.addEventListener('click',(e) => {
        let id = e.target.parentElement.getAttribute('id');
        let tarefaArealizar = e.target.getAttribute('class');
                
        e.stopImmediatePropagation()
        seleccionTarefaARealizar(id,tarefaArealizar)
        })
    }
}

export{
    eventosEGB
}
