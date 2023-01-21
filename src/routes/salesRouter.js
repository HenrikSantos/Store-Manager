const express = require('express');
const salesController = require('../controllers/salesController');
const validateSales = require('../middlewares/validateSales');

const salesRouter = express.Router();

salesRouter.get('/', salesController.listSales);

salesRouter.get('/:id', validateSales.verifyIfSaleExist, salesController.listSalesById);

salesRouter.post(
  '/',
  validateSales.validateSale,
  validateSales.verifyIfProductExist,
  salesController.createNewSale,
);

salesRouter.delete('/:id', validateSales.deleteSale, salesController.deleteSale);

salesRouter.put(
  '/:id',
  validateSales.validateSale,
  validateSales.verifyIfProductExist,
  validateSales.verifyIfSaleExist,
  salesController.updateSale,
);

module.exports = salesRouter;
