const express = require('express');
require('express-async-errors');

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.use(express.json());

// rota products
app.use('/products', productsRouter);

app.use('/sales', salesRouter);

// middleware de erro
app.use((error, req, res, _next) => {
  console.log(error);
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: 'internal server error' });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;