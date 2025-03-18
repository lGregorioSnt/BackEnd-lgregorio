const express = require('express')
const userService = require ('./userService')

const app = express() 
app.use(express.json()) //ativa o json no express


//rota para usuario ser criado
app.post("/users", (req, res) =>{
    const {nome, email, senha, cpf, endereço, telefone} = req.body //passa um arquivo 
     if(!nome || !email || !senha || !endereço || !telefone || !cpf){ //caso o nome e o email sejam diferentes vai dar erro
        return res.status(400).json ({error: "Nome e email são obrigatórios"}) //mensagem caso dê erro
     }
     const user = userService.addUser(nome, email, senha, cpf, endereço, telefone)
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

app.delete("/users/:id", (req, res) =>{
    const id = parseInt(req.params.id)
   try{ userService.deleteUser(id)
    res.status(200).json({message: "Usuário deletado com sucesso"})}
    catch(erro){
        res.status(400).json({error: "Usuário não encontrado"})
    }
 app.put("/users/:id", (req, res) =>{   
    const id = parseInt(req.params.id)
    const {nome, email, senha, cpf, endereço, telefone} = req.body
    try{
        const user = userService.editUser(id, nome, email, senha, cpf, endereço, telefone)
        if(!user) return res.status(400).json({error: "Usuário não encontrado"})
        res.status(200).json({user})
    }
    catch(erro){
        res.status(400).json({error: "Usuário não encontrado"})
    }       
});})