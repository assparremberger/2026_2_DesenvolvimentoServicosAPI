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