const express = require('express');
const userService = require('./userService');

const app = express();
app.use(express.json()); // ativa o JSON no express

// Rota para usuário ser criado
app.post("/users", async (req, res) => {
    const { nome, email, senha, cpf, endereco, telefone } = req.body; 
    if (!nome || !email || !senha || !cpf || !endereco || !telefone) {
        return res.status(400).json({ error: "Nome, email, senha, endereço, telefone e CPF são obrigatórios" });
    }
    try {
        const user = await userService.addUser(nome, email, senha, cpf, endereco, telefone);
        res.status(200).json({ message: "Usuário criado com sucesso", user });
    } catch (erro) {

        res.status(500).json({ error: erro.message });
    }
});

// Rota para listar todos os usuários
app.get("/users", (req, res) => {
    res.json(userService.getUser());
});

// Rota para deletar usuário
app.delete("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const resultado = await userService.deleteUser(id); // Aguarda o retorno do método deleteUser

        if (!resultado) {
            return res.status(404).json({ message: "Usuário não encontrado" }); // Retorna 404 se o usuário não for encontrado
        }

        return res.status(200).json({ message: "Usuário deletado com sucesso", resultado }); // Retorna sucesso se o usuário foi excluído
    } catch (erro) {
        res.status(500).json({ error: "Erro ao deletar usuário" }); // Retorna erro genérico em caso de falha
    }
});

// Rota para editar usuário
app.put("/users/:id", (req, res) => {   
   try{ const id = parseInt(req.params.id);
    const { nome, email, senha, cpf, endereco, telefone } = req.body;

   
        const user = userService.Edituser(id, nome, email, endereco, senha, telefone, cpf);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        res.status(200).json({ message: "Usuário atualizado com sucesso", user });
    } catch (erro) {
        console.error("Erro ao editar usuário:", erro);
        res.status(500).json({ error: "Ja possui um usuario com este cpf" });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("O servidor está rodando na porta:", port);
});
