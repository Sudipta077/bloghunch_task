const pool = require('../config/db');

const createProduct = async (name, price, description, images,seller_name,token) => {
  const query = `
    INSERT INTO products (name, price, description, images, status,seller_name,token)
    VALUES ($1, $2, $3, $4, 'Available',$5,$6)
    RETURNING *`;
  const values = [name, price, description, images,seller_name,token];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getProducts = async () => {

  const result = await pool.query('SELECT * FROM products');
  const products = result.rows; 
  return products;
};

const purchaseProducts = async (name) => {
    const query = `UPDATE products SET status = 'sold' WHERE name = $1 RETURNING *`;
    const values = [name];
     const {rows} = await pool.query(query, values);
    return rows[0];
};

const counter = async (timestamp,buyer,price,offered_by,product_name) => {

  const query = `
    UPDATE products SET negotiations = array_append(negotiations,'Time-stamp:$1
    Buyer:$2,
    Price:$3,
    Offered_by:$4')
WHERE name =$5;`;
  const values = [timestamp,buyer,price,offered_by,product_name];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createProduct,
  getProducts,purchaseProducts,counter
};
