const User = require("./user");
const path = require("path"); // Módulo para manipular caminhos
const fs = require("fs"); // Módulo para manipular arquivos
const bcrypt = require("bcryptjs"); // Módulo para criptografar senhas
const mysql = require("./mysql")
class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers(); // Invoca o método para carregar os usuários
        this.nextID = this.getNextId(); // Invoca o método para pegar o próximo ID
    }

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

    getNextId() {
        try {
            if (this.users.length === 0) return 1; // Caso não haja nenhum usuário
            return Math.max(...this.users.map(user => user.id)) + 1; // Retorna o maior id + 1
        } catch (erro) {
            console.log("Erro ao buscar o id", erro);
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users)); // Salva os usuários no arquivo
        } catch (erro) {
            console.log("Não foi possível salvar o usuário", erro); 
        }
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

    getUsers() {
        try {
            return this.users; // Retorna os usuários
        } catch (erro) {
            console.log("Erro ao puxar os usuários", erro);
        }
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id); // Filtra os usuários que não são o id passado
            this.saveUsers(); // Salva os usuários no arquivo
        } catch (erro) {
            console.log("Erro ao deletar usuário", erro);
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
