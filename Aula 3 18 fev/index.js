const express = require('express');
const userService = require('./userService');

const app = express();
app.use(express.json()); // ativa o JSON no express

// Rota para usuário ser criado
app.post("/users", (req, res) => {
    const { nome, email, senha, cpf, endereço, telefone } = req.body; // Passa um arquivo
    if (!nome || !email || !senha || !endereço || !telefone || !cpf) { // Caso o nome e o email sejam diferentes vai dar erro
        return res.status(400).json({ error: "Nome, email, senha, endereço, telefone e CPF são obrigatórios" }); // Mensagem caso dê erro
    }
    const user = userService.addUser(nome, email, senha, cpf, endereço, telefone);
    res.status(200).json({ user });
});

// Rota para listar todos os usuários
app.get("/users", (req, res) => {
    res.json(userService.getUsers());
});

// Rota para deletar usuário
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    try {
        userService.deleteUser(id);
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (erro) {
        res.status(400).json({ error: "Usuário não encontrado" });
    }
});

// Rota para editar usuário
app.put("/users/:id", (req, res) => {   
    const id = parseInt(req.params.id);
    const { nome, email, senha, cpf, endereço, telefone } = req.body;

    try {
        const user = userService.Edituser(id, nome, email, senha, cpf, endereço, telefone);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        res.status(200).json({ message: "Usuário atualizado com sucesso", user });
    } catch (erro) {
        console.error("Erro ao editar usuário:", erro);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("O servidor está rodando na porta:", port);
});
