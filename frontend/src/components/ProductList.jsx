import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Details from './Details';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/list');
        setProducts(response.data); 
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
       
      }
    };

    fetchProducts();
  }, []); 

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {!selectedProduct ? (
        <>
          <header className="bg-blue-100 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-800">Product List</h1>
              <div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
                  <NavLink to='/register'>Sell</NavLink>
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={Logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
          <main className="container mx-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} product={product} onClick={() => handleProductClick(product)} />
              ))}
            </div>
          </main>
        </>
      ) : (
        <Details product={selectedProduct} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default ProductList;
