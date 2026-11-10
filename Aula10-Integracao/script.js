function add(){
    const txtNome = document.getElementById("txtNome")
    const txtPreco = document.getElementById("txtPreco")

    if( txtNome.value != "" ){
        var preco = 0.0
        if( txtPreco.value != "" ){
            preco = parseFloat( txtPreco.value.replace(",", ".")  )
        }
        const req = new XMLHttpRequest()

        req.open("POST" , "http://localhost:8001/product")
        req.setRequestHeader( "Content-type" , 
                                "application/x-www-form-urlencoded")
        req.send("nome=" + txtNome.value + "&preco=" + preco +"&codCategoria=1")

    }
}