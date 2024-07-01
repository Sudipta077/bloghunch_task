import React from 'react';


const Card =  ({ product, onClick }) => {
  
  const statusColors = {
    Available: 'bg-green-500',
    reserved: 'bg-yellow-500',
    sold: 'bg-red-500',
  }; 

  return (
    
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer relative"
      onClick={onClick}
    >


<img
      src={require(`../chobi2/${product.images}`)}
      alt={product.name}
      className="w-full h-48 object-cover"
    />
      <div className="p-4">
        <h2 className="text-xl font-bold text-blue-800">{product.name}</h2>
        <p className="text-blue-600">{product.price}</p>
        <p className="text-gray-600">Seller: {product.seller_name}</p>
        {product.status && (
  <p
    className={`absolute bottom-2 right-2 px-2 py-1 text-xs font-bold text-white rounded ${statusColors[product.status]}`}
  >
    {product.status}
  </p>
)}
      </div>
    </div>
  );
};

export default Card;
