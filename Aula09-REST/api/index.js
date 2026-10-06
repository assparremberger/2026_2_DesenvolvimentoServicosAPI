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
        .join( "categoria" , "produto.codCategoria" , "=" , "categoria.id")
        .select("produto.*" , "categoria.nome AS cat" )
        .orderBy( "produto.nome" )
        .then( (dados) => {
            res.status( 200 )
            res.json( dados )
        } )
        .catch( next )
} )

api.get( '/product/:idProd' , (req, res, next)=>{
    const idProduto = req.params.idProd
    conn("produto")
        .join( "categoria" , "produto.codCategoria" , "=" , "categoria.id")
        .select("produto.*" , "categoria.nome AS cat" )
        .where( "produto.id" , idProduto )
        .first()
        .then( (dados) => {
            res.status( 200 )
            res.json( dados )
        } )
        .catch( next )
} )

api.post( '/product' , (req, res, next)=>{
    conn("produto")
        .insert( req.body )
        .then( (dados) => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao inserir"  ) )
            }
            res.status( 201 )
            res.json( { resposta : "Produto inserido!" , id : dados[0] } )
        } )
        .catch( next )
} )

api.put( '/product/:idProd' , (req, res, next)=>{
    const idProduto = req.params.idProd
    conn("produto")
        .where( "id", idProduto )
        .update( req.body )
        .then( (dados) => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao editar"  ) )
            }
            res.status( 200 )
            res.json( { resposta : "Produto editado!"  } )
            //res.json( dados )
        } )
        .catch( next )
} )

api.delete( '/product/:idProd' , (req, res, next)=>{
    const idProduto = req.params.idProd
    conn("produto")
        .where( "id", idProduto )
        .delete()
        .then( (dados) => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao excluir"  ) )
            }
            res.status( 200 )
            res.json( { resposta : "Produto excluído!"  } )
        } )
        .catch( next )
} )


// Colocando o servidor no ar
api.listen( PORT , ()=>{
    console.log( `API rodando em http://${HOSTNAME}:${PORT}` )
} )