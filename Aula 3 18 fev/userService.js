const User = require("./user")
const path = require("path") //modulo p manipular caminhos
const fs = require("fs");//modulo p manipular arquivos
const { json } = require("express");

class userService{
    constructor(){ //quando não passa parâmetro traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json');    
        this.users = [] // esse array é pra armazenar o user
        this.nextID = 1 //contador para gerar id
    }

    loadUsers(){
        try{ // tenta executar o codigo
        if (fs.existsSync(this.filePath)){ //verfica se o arquivo existe
            const data = fs.readFileSync(this.filePath); //le o arqv
            return JSON.parse(data); // transforma o json em objeto
        }
    }catch(erro){ //caso ocorra um erro
        console.log("erro ao carregar arquivo", erro)
    }
        return[]; //quebra de codigos
    }

    getNextId(){
        try{
        if(this.users.length===-0) return 1; 
        return Math.max(...this.users.map(user => user.id))+1;
        }
        catch (erro) {
          console.log("erro ao buscar o id", erro)
        }
    }
saveUsers (){
    try{
    fs.writeFileSync(this.filePath, json.stringify(this.users))// serve p salvar os arquivos
    }
    catch (erro){
        console.log ("Não foi possivel salvar o usuario", erro)
    }
}


    
    addUser(nome,email){
        try{
        const user = new User(this.nextID++, nome, email) // novoid++ é pra toda vez aumentar um no id
        this.users.push(user) 
        return user}
        catch (erro){
            console.log("erro ao adicionar usuario", erro)
        }
    }
    getUsers(){
        try{
        return this.users}
        catch (erro){
            console.log("erro ao puxar os usuarios", erro)
    }
}

}

module.exports = new userService