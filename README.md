# PROJETO StoreManager!
Uma API RESTful de sistema de gerenciamento de vendas no formato dropshipping, foi utilizado a arquitetura MSC (model-service-controller), é possível criar, visualizar, deletar e atualizar produtos e vendas..

## Habilidades desevolvidas:
- Arquitetura MSC;
- Express;
- Node;
- MySql
- Testes unitários;

## Técnologias usadas:

Front-end:
> Desenvolvido usando: ----------------------------------------------;

Back-end:
> Desenvolvido usando: Node, Expresss, MySql, Joi, Mocha, Chai, Sinon;

# Disclaimer: 
- É necessário ter instalado o node, mysql, git e docker; 

# Executando aplicação
- Clone utilizando: "git clone (chave ssh do projeto)";
- Abra a pasta da aplicação em um terminal;
- Use o comando: "docker-compose up -d";
- Use o comando: "docker exec -it store_manager bash";
- Use o comando: "npm install";
- Use o comando: "npm run migratin";
- Use o comando: "npm run seed";
- Use o comando: "npm run debug";

# Utilizando a aplicação
Após a configuração é possível criar, visualizar, deletar e atualizar produtos e vendas atráves das rotas products e sales;
# Products /
- get '/' - listar todos os produtos;
 
- get '/:id' - listar produto pelo ID;

- post '/' - cadastrar um novo produto;
   - é necessário passar um json com a chave name ex:
   { "name": "nome do produto" };

- put /:id - atualizar um produto;
  - é necessário passar um json com a chave name ex: {"name": "novo nome do produto" };

- get /search - realizar pesquisa por nome do produto;

- delete '/:id' - deletar um produto pelo Id;
#
# Sales /
- get '/' - listar todas as vendas;
 
- get '/:id' - listar venda pelo ID;

- post '/' - cadastrar nova venda;
   - é necessário passar um json com o id do produto e quantidade vendida, ex:
  [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];

- put /:id - atualizar uma venda pelo Id;
  - é necessário passar um json com o id do produto e quantidade vendida, ex:
  [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];

- delete '/:id' - deletar um produto pelo Id;
#
## DESENVOLVIDO POR:
- [Henrik Santos](https://www.linkedin.com/in/henrik-santos-dev/)