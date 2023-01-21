const connection = require('./connection');

const listAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const listProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const createNewProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [result] = await connection.execute(query, [name]);
  return result.insertId;
};

const updateProduct = async (id, name) => {
  const query = `
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?;`;
  await connection.execute(query, [name, id]);
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

const searchByQuery = async (search) => {
  console.log(search, 'entrou na model');
  const formatedSearch = `%${search}%`;
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [products] = await connection.execute(query, [formatedSearch]);
  console.log(products);
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