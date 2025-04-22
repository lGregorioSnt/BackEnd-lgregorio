const User = require("./user");
const path = require("path"); // Módulo para manipular caminhos
const fs = require("fs"); // Módulo para manipular arquivos
const bcrypt = require("bcryptjs"); // Módulo para criptografar senhas
const mysql = require("./mysql")
class userService {
   
    loadUsers() {
        try {
            if (fs.existsSync(this.filePath)) { // Verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); // Lê o arquivo
                return JSON.parse(data); // Transforma o JSON em objeto
            }
        } catch (erro) {
            console.log("Erro ao carregar arquivo", erro);
        }
        return []; // Retorna array vazio em caso de erro ou arquivo não encontrado
    }


    async addUser(nome, email, senha, cpf, endereco, telefone) {
        try {
            const senhacrpipto = await bcrypt.hash(senha, 10); // Criptografa a senha
            const resultados = await mysql.execute (`
		    insert into cadastros (nome, email, senha, endereco, telefone,cpf)
        	values (?, ?, ?, ?, ?, ?);`
            , [nome, email, senhacrpipto, endereco, telefone, cpf]
        ); // Insere o usuário no banco de dados
  return resultados;
    } catch (erro) {
            console.log("Erro ao adicionar usuário", erro);
            throw erro; // Lança o erro novamente para ser tratado no index.js
        }
    }

    async getUser(id) {
        try {
            const resultado = await mysql.execute(`SELECT * FROM cadastros;`); // Seleciona todos os usuários do banco de dados
            console.log("resultado", resultado); // Log do resultado
            return resultado;
        } catch (erro) {
            console.log("Erro ao puxar os usuários", erro);
        }
    }

    async deleteUser(id) {
        try {
            const resultado = await mysql.execute(
                `DELETE FROM cadastros WHERE id = ?;`,
                [id]
            );
    
            if (resultado.affectedRows === 0) {
                console.log("Usuário não encontrado");
                return null; // Retorna null se nenhum registro foi excluído
            }
    
            console.log("Usuário deletado com sucesso");
            return resultado; // Retorna o resultado da exclusão
        } catch (erro) {
            console.log("Erro ao deletar usuário", erro);
            throw erro; // Lança o erro para ser tratado no index.js
        }
    }
    async Edituser(id, nome, email, endereco, senha, telefone, cpf) {
        try {
            
            // Criptografa a senha
            const senhaCripto = await bcrypt.hash(senha, 10);
            const resultados = await mysql.execute(
                `
                UPDATE cadastros
                SET nome = ?, email = ?, senha = ?, endereco = ?, telefone = ?, cpf = ?
                WHERE id = ?;
                `,
                [nome, email, senhaCripto, endereco, telefone, cpf, id]
            );
            
            return resultados; // Retorna o usuário atualizado
        } catch (erro) {
            console.log('Erro ao atualizar usuario', erro);
            throw erro;
        }
    }
}

module.exports = new userService();
