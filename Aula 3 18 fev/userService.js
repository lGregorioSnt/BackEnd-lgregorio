const user = require("./user.js")

class userService{
    constructor(user, nextid){
        this.user = []; //array p armazena uzuario
        this.nextid = 1; // contador p gerar id
        
    }
    addUser(nome,email){
        const user = new user(this.nextid++, nome, email)
        this.user.push(user)
        return user
    }
    getUsers(){
        return this.user
    }
}

module.exports = new userService;