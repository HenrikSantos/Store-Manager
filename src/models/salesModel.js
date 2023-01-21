const connection = require('./connection');

const registerNewSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES(NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

// não está funcionando problema de assincronia :(  
const createNewSale = async ({ saleId, productId, quantity }) => {
  const queryNewSale = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  const [{ affectedRows }] = await connection.execute(queryNewSale, [saleId, productId, quantity]);
  return affectedRows;
};

const listSales = async () => {
  const query = `
  SELECT sales.id as saleId, sales.date, salesProduct.product_id as productId, salesProduct.quantity
  FROM StoreManager.sales_products AS salesProduct
INNER JOIN
  StoreManager.sales AS sales
ON sales.id = salesProduct.sale_id
ORDER BY sales.id, salesProduct.product_id
  `;
  const [sales] = await connection.execute(query);
  return sales;
};

const listSalesById = async (id) => {
  const query = `
  SELECT 
    sales.date, salesProduct.product_id AS productId, salesProduct.quantity
FROM
    StoreManager.sales_products AS salesProduct
        INNER JOIN
    StoreManager.sales AS sales 
  ON sales.id = salesProduct.sale_id
  WHERE sales.id = ?
ORDER BY sales.id, salesProduct.product_id
  `;
  const [sales] = await connection.execute(query, [id]);
  console.log(sales);
  return sales;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  console.log(result, 'sale deletada');
  return result;
};

const deleteSaleProducts = async (id) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  await connection.execute(query, [id]);
};

const updateSale = async (saleId, sales) => {
  await deleteSaleProducts(saleId);
  const promiseSales = sales.map(async (element) => {
    const { productId, quantity } = element;
    await createNewSale({ saleId, productId, quantity });
  });
  await Promise.all(promiseSales);
};

module.exports = {
  listSales,
  listSalesById,
  createNewSale,
  registerNewSale,
  deleteSale,
  updateSale,
};
