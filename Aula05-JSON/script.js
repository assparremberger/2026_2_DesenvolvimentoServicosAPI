function getDados(){

    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            const dados = JSON.parse( this.responseText )
            var txt = "Nome: " + dados.nome
            txt += "<br>Idade: " + dados.idade
            txt += "<br>Casado(a): "
            dados.casado ? txt += "Sim" : txt += "Não"
            txt += "<br>Cônjuge: " + dados.conjuge.nome
            if( dados.filhos.length > 0 ){
                txt += "<br>Filhos: "
                dados.filhos.forEach( child => {
                    txt += "<br> - " + child.nome + " Idade: " + child.idade
                })
            }
            document.getElementById("divDados").innerHTML = txt
        }
    }
    req.open("GET" , "dados.json" , true )
    req.send()
}


function getProdutos(){
    const req = new XMLHttpRequest()
    
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            const objJSON = JSON.parse( this.responseText )
            var txt = ""
            objJSON.produtos.forEach( prod => {
                txt += `<tr>
                            <td>${prod.id}</td>
                            <td>${prod.nome}</td>
                            <td>${prod.preco}</td>
                            <td><button onclick="editar(${prod.id}, '${prod.nome}' , ${prod.preco} )">
                                Editar</button>
                            </td>
                            <td><button onclick="excluir(${prod.id})">
                                X </button>
                            </td>
                        </tr>
                        ` 
            } )
            document.getElementById("tblProdutos").innerHTML = txt
        }
    }

    req.open("GET" , "servidor.php?buscar" , true)
    req.send()
}

function excluir( idProd ){
    const confirma = confirm(`Confirma a exclusão do id ${idProd}?`)
    if( confirma ){
        const req = new XMLHttpRequest()

        req.onreadystatechange = function(){
            if( this.readyState == 4 && this.status == 200){
                const objJSON = JSON.parse( this.responseText )
                alert( objJSON.resposta )
                getProdutos()
            }
        }
        req.open("GET" , "servidor.php?excluir&idProduto=" + idProd)
        req.send()
    }
}

function salvar(){
    const txtId = document.getElementById("txtId")
    const txtNome = document.getElementById("txtNome")
    const txtPreco = document.getElementById("txtPreco")
    if( txtNome.value == "" ){
        alert("O campo nome é obrigatório")
    }else{
        var preco = 0.0
        if( txtPreco.value != "" ){
            preco = parseFloat(  txtPreco.value.replace( "," , "."  ) )
        }

        const req = new XMLHttpRequest()
        // caso seha para adicionar, o campo ID estará vazio
        if( txtId.value == ""){
            req.onreadystatechange = function(){
                if( this.readyState == 4 && this.status == 200){
                    const objJSON = JSON.parse( this.responseText )
                    var txt = objJSON.resposta
                    if( objJSON.id ) {
                        txt += "\nID: " + objJSON.id
                        txtNome.value = ""
                        txtPreco.value = ""
                    }
                    alert( txt )
                    getProdutos()
                    
                }
            }
            req.open("POST" , "servidor.php?inserir")
        }else{
            req.onreadystatechange = function(){
                if( this.readyState == 4 && this.status == 200){
                    const objJSON = JSON.parse( this.responseText )
                    alert( objJSON.resposta )
                    getProdutos()
                    txtId.value = ""
                    txtNome.value = ""
                    txtPreco.value = ""
                }
            }
            req.open("POST" , "servidor.php?editar&idProduto=" + txtId.value )
        }
        req.setRequestHeader("Content-type" , "application/x-www-form-urlencoded")
        req.send(`name=${txtNome.value}&price=${preco}`)
    }
}


// Exercício
// Fazer as funções necessárias para poder editar um produto

function editar( id, nome, preco){
    document.getElementById("txtId").value = id
    document.getElementById("txtNome").value = nome
    document.getElementById("txtPreco").value = preco

}