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
                            <td><button onclick="editar(${prod.id})">
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