# Projeto

Email da CT

## Requisitos funcionais

- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel se autenticar;
- [X] Deve ser possível retornar emails recebidos;
- [X] Deve ser possível editar imagem de perfil;
- [X] Deve ser possível editar nome;
- [X] Deve ser possível deletar email;
- [X] Deve ser possível mandar e-mail;
- [X] Deve ser possível ver emails enviados;
- [ ] Deve ser possível ver um email específico;

## Regras de negócio

- [x] Não deve ser possível criar conta com e-mail duplicado;
- [X] Não deve ser possível deletar um e-mail que já foi visto pelo destinatário;
- [X] Apenas o remetente pode deletar o e-mail;
- [X] Depois de ler um email, o campo 'jaVisto' deve ser atualizado para 'true';
- [X] Ao mandar e-mail, o destinatário deve existir no banco;
- [ ] Apenas o destinatário ou remetente podem ver um e-mail;

## Requisitos não-funcionais

- [X] A senha do usuario precisa estar criptografada;
- [X] Os dados da aplicacao precisam estar persistidos em um banco PostGreSQL;
- [X] O usuario deve ser identificado por um JWT (JSON Web Token) que expira em 2h. (401 caso invalido)
