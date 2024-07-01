const { createProduct,purchaseProducts,counter } = require('../models/productModel');

const registerProduct = async (req, res) => {
  try {
    const { name, price, description ,seller_name,token} = req.body;
    const image = req.file.filename;
    
    const product = await createProduct(name, price, description, image,seller_name,token);
    if (product) {
      console.log('Registration successful');
      res.status(201).json({name,price,description});
      
    }
  } catch (error) {
    console.error('Product registration failed:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const purchase = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const product = await purchaseProducts(name);
    if (product) {
      console.log('Purchased:', product);
      res.status(201).json({ product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Purchase failed:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const counterOffer = async (req, res) => {
  const { offer } = req.body;

  try {
    const product = await counter(offer.timestamp,offer.buyer,offer.price,offer.offered_by,offer.product_name);
    if (product) {
      console.log('Purchased:', product);
      res.status(201).json({ product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('CounterOfferFaile', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  registerProduct,purchase,counterOffer
};
