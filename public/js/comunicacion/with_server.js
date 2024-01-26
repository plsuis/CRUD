const _servindoOServer = async (id,metodo,endpoint)=>{

    let resposta = await fetch (`/${endpoint}/${id}`,{method:metodo})
    let datosConvertidos = await resposta.json();

    console.log('datos convertidos ', datosConvertidos)

}

export{
    _servindoOServer
}