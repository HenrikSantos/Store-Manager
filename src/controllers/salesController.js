const salesServices = require('../services/salesServices');

const createNewSale = async (req, res) => {
  const sales = req.body;
  const saleId = await salesServices.createNewSale(sales);
  res.status(201).json({ id: saleId, itemsSold: sales });
};

const listSales = async (_req, res) => {
  const sales = await salesServices.listSales();
  return res.status(200).json(sales);
};

const listSalesById = async (req, res) => {
  const { id } = req.params; 
  const sales = await salesServices.listSalesById(id);
  res.status(200).json(sales);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  await salesServices.deleteSale({ id });
  res.status(204).send();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  await salesServices.updateSale({ id, sales });
  res.status(200).json({ saleId: id, itemsUpdated: sales });
};

module.exports = {
  listSales,
  listSalesById,
  createNewSale,
  deleteSale,
  updateSale,
};
