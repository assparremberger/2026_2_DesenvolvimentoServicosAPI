function lerXML(){

    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            const dadosXML = this.responseXML
            nome = dadosXML.getElementsByTagName("nome")[0].childNodes[0].nodeValue
            idade = dadosXML.getElementsByTagName("idade")[0].childNodes[0].nodeValue

            var txt = "Nome: " + nome + "<br>Idade: " + idade + "<br>Formações: "
            arrayFormacao = dadosXML.getElementsByTagName("formacao")
            for( i = 0 ; i < arrayFormacao.length ; i++){
                txt += arrayFormacao[i].childNodes[0].nodeValue + " - "
            }
            arrayFilho = dadosXML.getElementsByTagName("filho")
            txt += "<br>Filhos: "
            for( i = 0 ; i < arrayFilho.length ; i++){
                txt += "<br>Nome: " + arrayFilho[i].getElementsByTagName("nome")[0].childNodes[0].nodeValue
                txt += "<br>Idade: " + arrayFilho[i].getElementsByTagName("idade")[0].childNodes[0].nodeValue
                txt += "<br>------------------------"
            }
            document.getElementById("divDados").innerHTML = txt
        }
    }
    req.open("GET" , "dados.xml" )
    req.send()
}