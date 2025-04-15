const { rejects } = require("assert");
const { promises } = require("fs");
const mysql = require("mysql2");

// Criação do pool de conexões
const pool = mysql.createConnection({
    "user": "root",
    "password": "root",
    "database": "idev3",
    "host": "localhost",
    "port": "3307"
});

// Função para executar consultas no banco de dados
exports.execute = (query, param = [], varPool = pool) => {
    return new Promise((resolve, reject) => { 
        varPool.query(query, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

