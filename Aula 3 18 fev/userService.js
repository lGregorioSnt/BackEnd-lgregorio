const User = require("./user");
const path = require("path"); // módulo para manipular caminhos
const fs = require("fs"); // módulo para manipular arquivos

class userService {
    constructor() {
        // quando não passa parâmetro, traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers(); // invoca o método para carregar os usuários
        this.nextID = this.getNextId(); // invoca o método para pegar o próximo ID
    }

    loadUsers() {
        try {
            // tenta executar o código
            if (fs.existsSync(this.filePath)) { // verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); // lê o arquivo
                return JSON.parse(data); // transforma o JSON em objeto
            }
        } catch (erro) { // caso ocorra um erro
            console.log("Erro ao carregar arquivo", erro);
        }
        return []; // retorna array vazio em caso de erro ou arquivo não encontrado
    }

    getNextId() {
        try {
            if (this.users.length === 0) return 1; // caso não haja nenhum usuário
            return Math.max(...this.users.map(user => user.id)) + 1; // retorna o maior id + 1
        } catch (erro) {
            console.log("Erro ao buscar o id", erro);
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users)); // salva os usuários no arquivo
        } catch (erro) {
            console.log("Não foi possível salvar o usuário", erro);
        }
    }

    addUser(nome, email, senha, cpf, endereço, telefone) {
        try {
            const user = new User(this.nextID++, nome, email, senha, cpf, endereço, telefone); // cria novo usuário
            this.users.push(user); // adiciona o novo usuário
            this.saveUsers(); // salva os usuários no arquivo
            return user;
        } catch (erro) {
            console.log("Erro ao adicionar usuário", erro);
        }
    }

    getUsers() {
        try {
            return this.users; // retorna os usuários
        } catch (erro) {
            console.log("Erro ao puxar os usuários", erro);
        }
    }
    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id); // filtra os usuários que não são o id passado
            this.saveUsers(); // salva os usuários no arquivo
        }
        catch(erro){
            console.log("Erro ao deletar usuário", erro);
    }
}
    Edituser(id, nome, email, senha, cpf, endereço, telefone){
        try{
            const index = this.users.findIndex(user => user.id === id); // procura o índice do usuário com o id passado
            if(index === -1) return null; // caso não encontre o usuário
            this.users[index] = new User(id, nome, email, senha, cpf, endereço, telefone); // altera o usuário
            this.saveUsers(); // salva os usuários no arquivo
            return this.users[index];
        }
        catch(erro){
            console.log("Erro ao editar usuário", erro);
        }
    }
    
}

module.exports = new userService();
