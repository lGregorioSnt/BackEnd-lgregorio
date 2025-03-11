class User {
    constructor(id, nome, email, senha, endereço, cpf, telefone){
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
        this.endereço = endereço
        this.cpf = cpf
        this.telefone = telefone
    }
}
module.exports = User