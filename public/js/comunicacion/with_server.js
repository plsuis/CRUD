const _servindoOServer = async (id,metodo,endpoint,datos)=>{
    let resposta;

    console.log('metodo,endpoint,datos ',metodo,endpoint,datos)

    if(datos != null){

        resposta = await fetch (`/${endpoint}`,{method:metodo
            ,
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(datos)
            })
    }else{
        resposta = await fetch (`/${endpoint}/${id}`,{method:metodo})
    }
    let datosConvertidos = await resposta.json();

    console.log('resposta recibida ', datosConvertidos) 

}

export{
    _servindoOServer
}