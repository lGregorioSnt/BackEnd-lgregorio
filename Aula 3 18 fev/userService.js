const User = require("./user");
const path = require("path"); // Módulo para manipular caminhos
const fs = require("fs"); // Módulo para manipular arquivos
const bcrypt = require("bcryptjs"); // Módulo para criptografar senhas
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

    async addUser(nome, email, senha, cpf, endereço, telefone) {
        try {
            const userExists = this.users.some(user => user.cpf === cpf);
            if (userExists) {
                throw new Error("Usuário com este CPF já existe.");
            }
            const senhacrpipto = await bcrypt.hash(senha, 10); // Criptografa a senha
            const user = new User(this.nextID++, nome, email, senhacrpipto, endereço, cpf, telefone); // Cria novo usuário
            this.users.push(user); // Adiciona o novo usuário
            this.saveUsers(); // Salva os usuários no arquivo
            return user; // Retorna o usuário criado
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

    Edituser(id, nome, email, senha, cpf, endereço, telefone) {
        try {
            const userExists = this.users.some(u => u.id !== id && u.cpf === cpf); // Verifica se já existe um usuário com o CPF
            if (userExists) {
                throw new Error("Usuário com este CPF já existe.");
            }
            const index = this.users.findIndex(user => String(user.id) === String(id)); // Procura o índice do usuário com o id passado
            if (index === -1) return null; // Caso não encontre o usuário
 const senhacrpipto = bcrypt.hashSync(senha, 10); // Criptografa a senha
            // Atualiza somente os campos enviados na requisição
            Object.assign(this.users[index], {
                
                nome: nome || this.users[index].nome,
                email: email || this.users[index].email,
                senha: senhacrpipto, // Atualiza a senha criptografada
                cpf: cpf || this.users[index].cpf, 
                endereço: endereço || this.users[index].endereço,
                telefone: telefone || this.users[index].telefone
            });

            this.saveUsers(); // Salva os usuários no arquivo
            return this.users[index]; // Retorna o usuário atualizado
        } catch (erro) {
            console.log("Erro ao editar usuário", erro);
                    res.status(500).json({ error: erro.message });

        }
    }
}

module.exports = new userService();
