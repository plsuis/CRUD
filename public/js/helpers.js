import { _servindoOServer } from "./comunicacion/with_server.js";
function seleccionTarefaARealizar(id,tarefaArealizar,datos){
    let metodo = "";
    let endpoint = "";
    
    if(tarefaArealizar === 'borrar'){
        
        metodo = 'DELETE';
        endpoint = 'borradodatos'
    }
    if(tarefaArealizar === 'actualizar'){
        metodo = 'PUT'
        endpoint = 'modificadodatos'
    }
    _servindoOServer(id,metodo,endpoint,datos)
}


function eventosEGB(refLista){
    
    for(let refElemento of refLista){
        refElemento.addEventListener('click',(e) => {
        let id = e.target.parentElement.getAttribute('id');
        let tarefaArealizar = e.target.getAttribute('class');
                
        e.stopImmediatePropagation()
        seleccionTarefaARealizar(id,tarefaArealizar,null)
        })
    }
}

export{
    eventosEGB,
    seleccionTarefaARealizar
}
