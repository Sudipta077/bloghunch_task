import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form method='POST' className="bg-white w-80 p-6 rounded-2xl shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-center font-serif font-bold mb-8 text-2xl text-blue-800">Login</h1>
        
        <div className="mb-4">
          <input 
            type="email" 
            className="form-control w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input 
            type="password" 
            className="form-control w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full text-white p-2 bg-blue-800 hover:bg-blue-900 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
