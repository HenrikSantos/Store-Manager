const validateSale = (req, res, next) => {
  const sales = req.body;
  const validateProductId = sales.every((sale) => sale.productId);
  const validateQuantityMinimum = sales.every((sale) => sale.quantity > 0);
  const validateQuantity = sales.every((sale) => sale.quantity !== undefined);

  if (!validateProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  if (!validateQuantity) return res.status(400).json({ message: '"quantity" is required' });
  
  if (!validateQuantityMinimum) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const productsModel = require('../models/productsModel');

const verifyIfProductExist = async (req, res, next) => {
  let results = [];
  const sales = req.body;

  results = sales.map((sale) => productsModel.listProductById(sale.productId));
  results = await Promise.all(results);
  
  if (results.some((el) => el === undefined)) {
    return res.status(404).json({ message: 'Product not found' });
   }

  next();
};

const salesModel = require('../models/salesModel');

const verifyIfSaleExist = async (req, res, next) => {
  const { id } = req.params;
  const [result] = await salesModel.listSalesById(id);
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  next();
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  const [sale] = await salesModel.listSalesById(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.exports = {
  validateSale,
  verifyIfProductExist,
  deleteSale,
  verifyIfSaleExist,
};
