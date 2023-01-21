const express = require('express');
const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProducts');

const productsRouter = express.Router();

productsRouter.get('/search?', productsController.searchByQuery);

productsRouter.get('/', productsController.listAllProducts);

productsRouter.get('/:id', productsController.listProductById);

productsRouter.post('/', validateProducts.createNewProduct, productsController.createNewProduct);

productsRouter.put('/:id', validateProducts.updateProduct, productsController.updateProduct);

productsRouter.delete('/:id', validateProducts.deleteProduct, productsController.deleteProduct);

module.exports = productsRouter;
