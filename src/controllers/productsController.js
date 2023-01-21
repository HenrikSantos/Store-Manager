const productsServices = require('../services/productsServices');

const listAllProducts = async (_req, res) => {
  const products = await productsServices.listAllProducts();
  return res.status(200).json(products);
};

const listProductById = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const product = await productsServices.listProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;
  const id = await productsServices.createNewProduct(name);
  res.status(201).json({ name, id });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await productsServices.updateProduct({ id, name });
  res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsServices.deleteProduct({ id });
  res.status(204).send();
};

const searchByQuery = async (req, res) => {
  const { q } = req.query;
  const products = await productsServices.searchByQuery(q);
  res.status(200).json(products);
};

module.exports = {
  listAllProducts,
  listProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  searchByQuery,
};
