const express = require('express')
const userService = require ('./userService')

const app = express() 
app.use(express.json()) //ativa o json no express


//rota para usuario ser criado
app.post("/users", (req, res) =>{
    const {nome, email} = req.body //passa um arquivo 
     if(!nome || !email){ //caso o nome e o email sejam diferentes vai dar erro
        return res.status(400).json ({error: "Nome e email são obrigatórios"}) //mensagem caso dê erro
     }
     const user = userService.addUser(nome, email)
     res.status(200).json({user})
})

//rota pra listar todos os usuarios
app.get("/users", (req, res)=>{
    res.json(userService.getUsers())
})

const port = 3000
app.listen (port, () =>{
    console.log("O servidor está rodando na porta: ", port)
})