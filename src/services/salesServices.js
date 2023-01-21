const salesModel = require('../models/salesModel');

const createNewSale = async (sales) => {
  const saleId = await salesModel.registerNewSale();

  const promiseSales = sales.map(async (element) => {
    const { quantity, productId } = element;
    await salesModel.createNewSale({ saleId, quantity, productId });
  });

  await Promise.all(promiseSales);

  return saleId;
};

const listSales = async () => {
  const products = await salesModel.listSales();
  return products;
};

const listSalesById = async (id) => {
  const product = await salesModel.listSalesById(id);
  return product;
};

const deleteSale = async ({ id }) => {
  await salesModel.deleteSale(id);
};

const updateSale = async ({ id, sales }) => {
  await salesModel.updateSale(id, sales);
};

const searchByQuery = async (query) => {
  await salesModel.searchByQuery(query);
};

module.exports = {
  listSales,
  listSalesById,
  createNewSale,
  deleteSale,
  updateSale,
  searchByQuery,
};
