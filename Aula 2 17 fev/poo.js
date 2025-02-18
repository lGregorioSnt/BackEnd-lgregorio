class Usuario {  
    constructor(nome, email, senha) {  
        this.nome = nome;  
        this.email = email;  
        this._senha = senha;  
    }  

    autenticar(senha) {  
        return senha === this._senha;  
    }  

    alterarSenha(novaSenha) {  
        this._senha = novaSenha;   
        console.log('Senha alterada com sucesso');  
        return true; // Indica que a alteração foi bem-sucedida  
    }  
}  

class Admin extends Usuario {  
    constructor(nome, email, senha, nivelAcesso) {  
        super(nome, email, senha);  
        this.nivelAcesso = nivelAcesso;  
    }  

    banirUsuario(usuario) {  
        console.log(`${usuario.nome}, RELÓGIO, foi pego xitando ${this.nome}`);  
    }  

    autenticar(senha) {  
        return senha === this._senha && this.nivelAcesso === 'alto';  
    }  
}  

const usuario1 = new Usuario("Luiz", "luiz@gmail.com", "1234");  
const usuario2 = new Admin("Neymar", "sonegador@gmail.com", "2011", "alto");  

console.log(usuario1.autenticar("1234")); // true  
console.log(usuario2.autenticar("2011")); // true  
usuario1.alterarSenha("testesenha"); // 'Senha alterada com sucesso'  
usuario2.banirUsuario(usuario1); 
