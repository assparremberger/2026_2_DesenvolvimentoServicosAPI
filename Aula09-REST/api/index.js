const express = require('express')
const knex = require('knex')
const http_errors = require('http-errors')

const PORT = 8001
const HOSTNAME = "localhost"

const api = express()
api.use( express.json() )
api.use( express.urlencoded( { extended : true } ) )

// Criar a conexão com o banco
const conn = knex( {
    client : "mysql" ,
    connection : {
        host : HOSTNAME ,
        user : "root" ,
        password : "" ,
        database : "loja_26_2"
    }
} )

// Construção dos endpoints
api.get( '/' , (req, res, next)=>{
    res.status( 200 )
//    res.send( '{ "resposta" : "Seja bem-vindo(a) à nossa API" }' )
    res.json( { resposta : "Seja bem-vindo(a) à nossa API" } )
} )

api.get( '/product' , (req, res, next)=>{
    conn("produto")
        .select("id" , "nome" , "preco")
        .orderBy( "nome" )
        .then( (dados) => {
            res.status( 200 )
            res.json( dados )
        } )
        .catch( next )
} )


// Colocando o servidor no ar
api.listen( PORT , ()=>{
    console.log( `API rodando em http://${HOSTNAME}:${PORT}` )
} )