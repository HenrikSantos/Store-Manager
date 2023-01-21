const Joi = require('joi');
const productsModel = require('../models/productsModel');

const createNewProduct = (req, res, next) => {
const validateName = Joi.object({ name: Joi.string().required().min(5) });
  const { name } = req.body;
  const { error } = validateName.validate({ name });
  if (error) {
    return res.status(`${(error.details[0].type === 'string.min') ? 422 : 400}`)
      .json({ message: error.message });
  }
  next();
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsModel.listProductById(id);
  if (!name) res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (!product) return res.status(404).json({ message: 'Product not found' });
  next();
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsModel.listProductById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = {
  updateProduct,
  deleteProduct,
  createNewProduct,
};
