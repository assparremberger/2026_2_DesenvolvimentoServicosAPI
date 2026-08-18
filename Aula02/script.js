var total = 0
function add(){
    var txtNome = document.getElementById("txtNome")
    var divProdutos = document.getElementById("divProdutos")

    var nome = txtNome.value 
    if( nome == "" ){
        alert("O campo nome deve ser preenchido!")
    }else{
        var txtPreco = document.getElementById("txtPreco") 
        var preco = txtPreco.value
        if( preco == "" )
            alert("Digite o Preço!")
        else{
            total += parseFloat( preco.replace( "," , "." ) ) 
            divProdutos.innerHTML += nome + " - " + preco + "<br>"
            document.getElementById("divTotal").innerHTML = total
            txtNome.value = ""
            txtPreco.value = ""   
        }
    }
}



var pessoa1 = { nome : "Maria" , idade : 25 }

var pessoa2 = { 
    nome : "João" , 
    idade : 20 ,
    altura : 1.75 ,
    casado : false ,
    endereco : null ,
    getDados : function(){
        return this.nome + " - " + this.idade + " anos"
    }
}

function lerDados(){
    txt = "Nome: " + pessoa2.getDados() 
    txt += "<br>Altura: " + pessoa2.altura
    txt += "<br>Casado: "
    if( pessoa2.casado )
        txt += "Sim"
    else 
        txt += "Não"
    document.getElementById("divDados").innerHTML = txt
}

// Exercício
// Construir um formulário que pergunte ao usuário o seu nome,
// seu peso e sua altura. 
// Pegar estes dados e cricar um objeto com estes 3 atributos, 
// juntamente com uma função calcularIMC.
// Exibir na tela o IMC através do retorno da função calcularIMC.

usuario = {
    nome : "" ,
    peso : 0.0 ,
    altura : 0.0 , 
    calcularIMC : function(){
        imc=this.peso/ (this.altura * this.altura)
        return imc
    }
}

function calcular(){
    nome = document.getElementById("txtUsuario").value
    peso = document.getElementById("txtPeso").value
    altura = document.getElementById("txtAltura").value

    if( nome == "" || peso == "" || altura == "" ){
        alert("Nome, peso e altura devem ser preenchidos")
    }else{
        usuario.nome = nome
        usuario.peso = peso.replace("," , ".")
        usuario.altura = altura.replace("," , ".")
        divIMC = document.getElementById("divIMC")
        divIMC.innerHTML = "Nome: " + usuario.nome
        divIMC.innerHTML += "<br>Peso: " + usuario.peso
        divIMC.innerHTML += "<br>Altura: " + usuario.altura
        divIMC.innerHTML += "<br>IMC: " + usuario.calcularIMC()

    }

}