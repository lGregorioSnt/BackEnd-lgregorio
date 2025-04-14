insert into cadastros (idusuario, nome, senha, email, endereço, telefone, cpf)
values (1, "zanga", 123123, "zanga@gmail.com", "quintino"," 1293821", "20012831")

	update cadastros
	   set nome = "otavio"
    	 where idusuario = 1	

delete from cadastros 
where idusuario = 1

		insert into cadastros (nome, email, senha, endereco, telefone,cpf)
        	values ("biston","email@emalds", "123", "rua abc", "123","123213")
        