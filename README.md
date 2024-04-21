# loginSistem
 Sistema de login em JS
 Para que o sistema de login funcione perfeitamente será necessário alguns ajustes:
 1) Na raiz crie um arquivo .env com as seguintes variáveis e seus respectios dados:<br>
    A) DB_NAME, Variável que carrega o nome do banco;<br>
    B) URL_DB, URL do banco de dados. Nota: Estamos utilizando mongoDB;<br>
    C) PORT_APLICATION, Porta definida para a aplicação funcionar;<br>
    D) SECRET, Um HASH de segurança para que a aplição fique mais segura.<br>

 2) Crie um arquivo .gitignore e adicione em seu conteúdo as pastas ou arquivos que não serão upadas.
 3) Ao baixar esse repositório abra o terminal e execute o camando: npm install para baixar as dependencias no package.json.
 4) Rode a aplicação no prompt com o comando: npm start.

Este sistema não tem front end, e pode ser perfeitamente testado com postman ou similares.
Para as rotas, estou utilizando como exemplo que sua porta de comunicação seja a 3000.<br>
 Rotas Disponivéis:<br>
  A) Get -> Rota pública: http://localhost:3000;<br>
  B) Get -> Rota Privada: http://localhost/user/ID. Onde o ID é exatamente o do usuário cadastrado no banco;<br>
  C) Post -> Rota de registro de usuário: http://localhost/auth/register. <br>
     Por se tratar de uma api em json sera necessário que os dados sigam este formado.<br>
     {<br>
       "name": "nome do usuario",<br>
       "email": "email",<br>
       "password": "senha",<br>
       "confirmpassword": "confimação de senha"<br>
    };<br>

 D) Post -> Rota de login.<br>
    Segue o mesmo parametro acima.<br>
     {<br>
      "email": "juanpara.com",<br>
      "password": "004209"<br>
     }
    
    
