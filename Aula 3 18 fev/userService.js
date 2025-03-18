const User = require("./user");
const path = require("path"); // Módulo para manipular caminhos
const fs = require("fs"); // Módulo para manipular arquivos

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

    addUser(nome, email, senha, cpf, endereço, telefone) {
        try {
            const user = new User(this.nextID++, nome, email, senha, cpf, endereço, telefone); // Cria novo usuário
            this.users.push(user); // Adiciona o novo usuário
            this.saveUsers(); // Salva os usuários no arquivo
            return user;
        } catch (erro) {
            console.log("Erro ao adicionar usuário", erro);
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

    Edituser(id, nome, email, senha, cpf, endereço, telefone) {
        try {
            const index = this.users.findIndex(user => String(user.id) === String(id)); // Procura o índice do usuário com o id passado
            if (index === -1) return null; // Caso não encontre o usuário

            // Atualiza somente os campos enviados na requisição
            Object.assign(this.users[index], {
                nome: nome || this.users[index].nome,
                email: email || this.users[index].email,
                senha: senha || this.users[index].senha,
                cpf: cpf || this.users[index].cpf,
                endereço: endereço || this.users[index].endereço,
                telefone: telefone || this.users[index].telefone
            });

            this.saveUsers(); // Salva os usuários no arquivo
            return this.users[index]; // Retorna o usuário atualizado
        } catch (erro) {
            console.log("Erro ao editar usuário", erro);
            return null;
        }
    }
}

module.exports = new userService();
