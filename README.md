# Memoteca

A Memoteca é um aplicativo organizador de pensamentos e frases que permite cadastrar, listar, editar,  deletar, filtrar e favoritar pensamentos, incluindo informações como conteúdo, autoria e data.

![Imagem do Memoteca](assets/imagens/screenshot.png)

## 🔨 Funcionalidades do projeto

- Cadastro de pensamentos, com conteúdo e autoria.
- Edição de pensamentos.
- Exclusão de pensamentos.
- Busca typeahead, faz a busca em tempo real enquanto a pessoa digita.
- Favoritar pensamentos.
- Validações com regEx para validar os inputs.
- Cadastro de data dos pensamentos.

<h3>Tecnologias Utilizadas</h3>
<div>
  <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-239120?&style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-239120?&style=for-the-badge&logo=node&logoColor=white">
</div>

- `JSON Server`: Utilizado para simular um backend e facilitar o desenvolvimento e teste das operações CRUD.
- `Axios`: Biblioteca usada para facilitar e simplificar as requisições HTTP.

## 🛠️ Abrir e rodar o projeto

Para executar o projeto, é necessário uma API fake, você vai precisar do NodeJS; a versão utilizada foi a 20.12.2.

Instale o JSON Server globalmente (se ainda não estiver instalado):

```bash
npm install -g json-server
```

Para executar, abra um novo terminal e, dentro da pasta backend, execute:

```bash
npm start
```

Acesse o backend localmente em seu navegador:

http://localhost:3000

Para executar o frontend, abra o projeto no Visual Studio Code. Com a extensão Live Server instalada, clique com o botão direito no arquivo index.html e selecione "Open with Live Server" no menu de contexto.

Acesse o frontend localmente em seu navegador:

http://localhost:5500

<h2>Desenvolvedor</h2>

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/74017914?v=4" width=115><br><sub>Pedro Fedizko de Castro</sub>](https://github.com/DFedizko) |
| :---: |
