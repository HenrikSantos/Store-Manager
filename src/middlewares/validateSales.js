const validateParams = (sales) => {
  let validateProductId = 0;
  let validateQuantity = 0;
  let lessQuantity = 0;
  sales.forEach((element) => {
    const { productId, quantity } = element;
    if (!productId) validateProductId += 1;
    if (!quantity) validateQuantity += 1;
    if (quantity <= 0) lessQuantity += 1;
  });
  return {
    validateProductId,
    validateQuantity,
    lessQuantity,
  };
};

const validateSale = async (req, res, next) => {
  const sales = req.body;
  const {
    validateProductId,
    validateQuantity,
    lessQuantity,
    } = validateParams(sales);
  if (validateProductId !== 0) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (lessQuantity !== 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (validateQuantity !== 0) return res.status(400).json({ message: '"quantity" is required' });
  next();
};

const productsModel = require('../models/productsModel');

const verifyIfProductExist = async (req, res, next) => {
  let results = [];
  const sales = req.body;
  
  for (let index = 0; index < sales.length; index += 1) {
    const { productId } = sales[index];
    results.push(productsModel.listProductById(productId));
  }
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
