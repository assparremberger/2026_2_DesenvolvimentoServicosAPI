const mysql = require('mysql')
const http = require('http')

const hostname = "127.0.0.1"
const port = 3000

const conn = mysql.createConnection( { 
    host : hostname ,
    user : "root" ,
    password : "",
    database : "loja_26_2"
} )

function consultar( res ){
    const sql = "SELECT * FROM produto ORDER BY nome"

    conn.query( sql , (err, result, fields ) => {
        if( err ){
            res.end( JSON.stringify( 
                                        { 
                                            resposta : "Erro na consulta" ,
                                            erro : err 
                                        } 
                                    )  
                    )
        }else{
            res.end(  JSON.stringify(result) )
        }
    } )
}

const server = http.createServer(  (req, res) => { 
    res.statusCode = 200
    res.setHeader( 'Content-Type' , 'application/json' )
    try {
        if( conn.state != "authenticated"){
            conn.connect( function(err){
                if( err ){
                    // res.end( `{ "resposta" : "Erro ao conectar ao banco!" , "erro": ${err} } ` )
                    res.end( JSON.stringify( 
                                                { 
                                                    resposta : "Erro ao conectar ao banco!" ,
                                                    erro : err 
                                                } 
                                            ) 
                            )
                }else{
                    consultar( res )
                }
            } )
        }else{
            consultar( res )
        }
    } catch (error) {
        res.statusCode = 500
        res.end( ' { "resposta" : "Erro no servidor" } ' )
    }
} )


server.listen( port , hostname , ()=>{
    console.log( `Servidor rodando em: http://${hostname}:${port} `)
})