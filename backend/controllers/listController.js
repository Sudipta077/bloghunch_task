const { getProducts } = require('../models/productModel');
const list = async(req,res)=>{
  
        try {
            const data = await getProducts();
            res.status(200).json( data );
            
        } catch (err) {
            console.error('Error fetching products', err);
            res.status(500).json({ error: 'Error fetching products' });
        }

}
module.exports={
    list
};