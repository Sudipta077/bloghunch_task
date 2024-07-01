import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Details = ({ product, onBack }) => {
  const [negotiations, setNegotiations] = useState(product.negotiations);
  const [counterOfferPrice, setCounterOfferPrice] = useState('');
  const [counterOfferName, setCounterOfferName] = useState(''); 
  const [showCounterOfferInput, setShowCounterOfferInput] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
   
    setIsSeller(product.token === token);
  }, [product.token, token]);

  const handlePurchase = async (name) => {
    product.status = 'Sold';
    alert(name);
    await axios.post('/auth/purchase', { name: name });
    onBack();
  };

  const handleCounterOffer = () => {
    setShowCounterOfferInput(true);
    
  };

  const submitCounterOffer =async () => {
    const newPrice = counterOfferPrice.trim();
    const name = isSeller ? 'seller' : counterOfferName; 
    if (newPrice && name) {
      const newNegotiation = {
        product_name:product.name,
        timestamp: new Date().toISOString(),
        buyer: counterOfferName,
        price: newPrice,
        offered_by : name, 
      };
      await axios.post('/auth/counterOffer',{offer:newNegotiation})
      setNegotiations([...negotiations, newNegotiation]);
      setCounterOfferPrice('');
      setCounterOfferName(''); 
      setShowCounterOfferInput(false);
      onBack();
    }
  };

  const handleAccept = () => {
    product.status = 'Reserved';
    onBack();
  };

  return (
    <div className="container mx-auto py-8">
      <button onClick={onBack} className="mb-4 text-blue-600">
        Back to List
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">{product.name}</h2>
        <p className="text-blue-600 mb-2">Status: {product.status}</p>
        <p className="text-blue-600 mb-2">Price: {product.price}</p>
        <p className="text-gray-600 mb-4">Description: {product.description}</p>
        <div className="mb-4">
          <img
            src={require(`../chobi2/${product.images}`)}
            alt=""
            className="w-48 h-48 contain mb-2"
          />
        </div>
        {product.status !== 'sold' && !isSeller && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mb-4 mx-2"
            onClick={(e) => handlePurchase(product.name)}
          >
            Purchase
          </button>
        )}
        {product.status !== 'sold' && !isSeller && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCounterOffer}
          >
            Counter Offer
          </button>
        )}
        {showCounterOfferInput && (
          <div className="mb-4">
            <input
              type="text"
              className="border rounded-md px-2 py-1"
              placeholder={isSeller ? "Enter customer name" : "Enter your name"}
              value={isSeller ? product.sellerName : counterOfferName}
              onChange={(e) => isSeller ? null : setCounterOfferName(e.target.value)}
              disabled={isSeller} 
            />
            <input
              type="text"
              className="border rounded-md px-2 py-1"
              placeholder="Enter new price"
              value={counterOfferPrice}
              onChange={(e) => setCounterOfferPrice(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md ml-2"
              onClick={submitCounterOffer}
            >
              Submit
            </button>
          </div>
        )}
        {negotiations.length > 0 && isSeller && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Negotiation History</h3>
            <ul>
              {negotiations.map((neg, index) => (
                <li key={index} className="mb-2">
                  
                  <p>{neg}</p>
                  { !isSeller && (
                    <>
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded-md mr-2"
                        onClick={() => handleCounterOffer()}
                      >
                        Counter Offer
                      </button>
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded-md"
                        onClick={() => handleAccept()}
                      >
                        Accept
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
