const http = require("http")

const server = http.createServer(  (req, res) => { 
    res.statusCode = 200
    res.setHeader( 'Content-Type' , 'text/plain' )
    res.end('Olá mundinho!')
} )

server.listen( 3000 , '127.0.0.1' , () => {
    console.log("Servidor rodando em http://127.0.0.1:3000")
} )