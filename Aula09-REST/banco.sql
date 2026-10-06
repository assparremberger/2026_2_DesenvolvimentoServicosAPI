CREATE DATABASE loja_26_2;

USE loja_26_2;

CREATE TABLE categoria (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nome VARCHAR(100) NOT NULL ,
    preco DOUBLE , 
    codCategoria INT NOT NULL ,
    FOREIGN KEY (codCategoria) REFERENCES categoria (id)
);

INSERT INTO categoria (nome) VALUES ("Bebidas") , ("Alimentos");


INSERT INTO produto (nome, preco, codCategoria ) VALUES 
( "Coca-Cola" , 9.89 , 1 ) , 
( "Pepsi" , 7.99 , 1 ) , 
( "Trakinas" , 3.50 , 2 ) ;

