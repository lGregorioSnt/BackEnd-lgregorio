const User = require("./user.js"); // Import User class  

class UserService {  
    constructor() {  
        this.users = []; // Array to store users  
        this.nextId = 1; // Counter to generate IDs  
    }  

    addUser(nome, email) {  
        const user = new User(this.nextId++, nome, email);  
        this.users.push(user);  
        return user;  
    }  

    getUsers() {  
        return this.users;  
    }  
}  

module.exports = new UserService(); // Export a new instance of UserService