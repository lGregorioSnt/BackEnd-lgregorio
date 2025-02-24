const express = require("express");  
const userService = require("./userService");  

const app = express();  
app.use(express.json()); // Enable JSON parsing for incoming requests  

// Route to create a user  
app.post("/userx", (req, res) => {  
    const { nome, email } = req.body  
    if (!nome || !email) {  
        return res.status(400).json({ error: "Nome e email são obrigatórios" });  
    }  

    const user = userService.addUser(nome, email);  
    return res.status(201).json({ user }); // Change status to 201 for created resource  
});  

// Route to show users  
app.get("/users", (req, res) => {  
    const users = userService.getUsers(); // Call the function to retrieve the users  
    return res.json(users); // Return the list of users  
});  

const port = 3000;  
app.listen(port, () => {  
    console.log("Server rodando na porta", port);  
});