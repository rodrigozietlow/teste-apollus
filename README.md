# Apollus

Projeto feito em Angular

## Instalação

Antes de tudo, clone este repo e instale os pacotes da npm pra rodá-lo

`cd path/to/the/folder`

`npm install`

## Como rodar esta aplicação?

Primeiro, você precisa abrir o servidor de testes do angular para rodar este App.

`ng serve`

## O que é necessário configurar antes do login

Você precisa configurar pelo menos um usuário administrador antes de fazer o
primeiro login (afinal, sem usuário, sem login).

Abra no navegador o seguinte link:

`localhost:4200`


Abra as opções de desenvolvedor `Ctrl + Shft + J` e vá na aba *Application*.

Lá, crie uma nova entrada com o seguinte par chave-valor:

Chave: `dbUser`

Valor: `[{"id": 1, "name": "Administrador", "email": "administrador@administrador.com", "type": "admin", "pwd": "123"}]`

Agora é só fazer login com as informações de administrador:

`administrador@administrado.cm` e senha `123` (ou qualquer informação passada na chave dbUser)
