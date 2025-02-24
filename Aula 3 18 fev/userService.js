const User = require("./user")
const path = require("path") //modulo p manipular caminhos
const fs = require("fs")//modulo p manipular arquivos

class userService{
    constructor(){ //quando não passa parâmetro traz um valor fixo, que não muda
        this.users = [] // esse array é pra armazenar o user
        this.nextID = 1 //contador para gerar id
    }
    
    addUser(nome,email){
        const user = new User(this.nextID++, nome, email) // novoid++ é pra toda vez aumentar um no id
        this.users.push(user) 
        return user
    }
    getUsers(){
        return this.users
    }
}

module.exports = new userService