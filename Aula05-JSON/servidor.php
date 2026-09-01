<?php
    header( "Content-type: application/json" ); 
    $local = "localhost" ;
    $user = "root";
    $password = "";
    $banco = "loja_26_2";

    if(isset( $_REQUEST['buscar'] ) ){

        $conn = mysqli_connect($local, $user, $password, $banco);
        if( $conn ){
            $query = "SELECT * FROM produto ORDER BY nome";
            $result = mysqli_query($conn, $query);
            $linhas = array();
            while( $row = mysqli_fetch_assoc($result) ){
                $linhas[] = $row;
            }
            mysqli_close($conn);
            echo '{ "produtos" : '.json_encode($linhas).' }';
        }

    }

    if(isset( $_REQUEST['excluir'] ) ){

        $conn = mysqli_connect($local, $user, $password, $banco);
        if( $conn ){

            $idProd = $_GET["idProduto"];

            $query = "DELETE FROM produto WHERE id = $idProd";
            mysqli_query($conn, $query);
            mysqli_close($conn);
            echo '{ "resposta" : "Produto excluído com sucesso!" }';
        } 

    }

    if(isset( $_REQUEST['inserir'] ) ){

        $nome = $_POST["name"];
        $preco = $_POST["price"];

        $preco = str_replace( "," , ".", $preco);
        if( $preco == "" ) 
            $preco = 0.0;

        try{
            $conn = mysqli_connect($local, $user, $password, $banco);
            if( $conn ){
                $query = "INSERT INTO produto (nome, preco) VALUES ( '$nome' , $preco ) ";
                mysqli_query($conn, $query);
                $id = mysqli_insert_id( $conn );
                mysqli_close($conn);
                if( $id > 0 )
                    echo '{ "resposta" : "Produto inserido com sucesso" , "id" : '.$id.' }';
                else
                    echo '{ "resposta" : "Erro ao tentar inserir" }';
            }else
                echo '{ "resposta" : "Erro ao tentar conectar" }';
            
        }catch( \Throwable $th ){
            echo '{ "resposta" : "Erro ao tentar conectar" }';
        }
        
    }

    