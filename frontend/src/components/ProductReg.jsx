import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductRegistration = () => {

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    alert(token);
    const formData = new FormData(e.target);
    formData.append('token',token);
    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      console.log('Response:', response.data);
      navigate('/home');
      window.location.reload();
    } catch (error) {
      console.error('Product registration failed:', error.message);
      
    }
  }

  const navigate = useNavigate();  

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form   encType='multipart/form-data'  onSubmit={handleSubmit} className="bg-white w-80 p-6 rounded-2xl shadow-md" >
        <h1 className="text-center font-serif font-bold mb-8 text-2xl text-blue-800">Register Product</h1>
        
        <div className="mb-4">
          <input 
            type="text" 
            className="form-control w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Product Name"
            
           
            name='name'
          />
        </div>
        <div className="mb-4">
          <input 
            type="text" 
            className="form-control w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Your Name"
            
           
            name='seller_name'
          />
        </div>

        <div className="mb-4">
          <input 
            type="number" 
            className="form-control w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Price"
        
           
            name='price'
          />
        </div>

        <div className="mb-4">
          <textarea 
            className="form-control w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Description"
            
           
            name='description'
          ></textarea>
        </div>

        <div className="mb-4">
          <input 
            type="file" 
            className="form-control w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"             
            name='image'
           
          />
        </div>
        
        <div className="flex justify-between">
          <button 
            type="submit" 
            className="w-full text-white p-2 bg-blue-800 hover:bg-blue-900 rounded-xl"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
          <button 
            type="button" 
            className="w-full text-white p-2 bg-red-800 hover:bg-red-900 rounded-xl ml-4"
            onClick={() => navigate('/home')}
          >
            Cancel
          </button>
        </div>
      </form>
     
          </div> 
  );
}

export default ProductRegistration;
