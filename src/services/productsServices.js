const productsModel = require('../models/productsModel');

const listAllProducts = async () => {
  const products = await productsModel.listAllProducts();
  return products;
};

const listProductById = async (id) => {
  const product = await productsModel.listProductById(id);
  if (!product) throw new Error(JSON.stringify({ status: 404, message: 'Product not found' }));
  return product;
};

const createNewProduct = async (name) => {
  const id = await productsModel.createNewProduct(name);
  return id;
};

const updateProduct = async ({ id, name }) => {
  await productsModel.updateProduct(id, name);
};

const deleteProduct = async ({ id }) => {
  await productsModel.deleteProduct(id);
};

const searchByQuery = async (search) => {
  console.log('entrou na service', search);
  const products = await productsModel.searchByQuery(search);
  return products;
};

module.exports = {
  listAllProducts,
  listProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  searchByQuery,
};
