const { rejects } = require("assert");
const { promises } = require("fs");
const mysql = require("mysql");

// Criação do pool de conexões
const pool = mysql.createPool({
    "user": "root",
    "password": "root",
    "database": "idev3",
    "host": "localhost",
    "port": "3306"
});

// Função para executar consultas no banco de dados
exports.execute = (query, param = [], varPool = pool) => {
    return new Promise((resolve, reject) => { // Corrigido 'promise' para 'Promise'
        varPool.query(query, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};