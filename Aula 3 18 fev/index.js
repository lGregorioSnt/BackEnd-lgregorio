const express = require("express")
const userService = require("./userService")

const app = express(); // nome qualquer p express
app.use(express.json()); //habilitar json no express

// rota p criar user

app.post("/user", (req,res) => {
    const {nome, email} = req.body;     
    if(!nome || !email){
        return res.status(400).json
        ({error: "Nome e email são obrigatorios"})}
        
        const user = userService.addUser(nome,email);
        res.status(200). json({user});
})

// rota p mostra users

app.get ("/user", (req, res) =>{
    res.json (userService.getUsers)
})

const port = 3000;
app.listen(port, () =>{
    console.log("Server rodando na porta", port)
})