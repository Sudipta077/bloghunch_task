const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {createUser,getUser}= require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);
    
 
    const user = await createUser(email, hashedPassword);

  
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '3h',
    }); 

  

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login failed:', error.message); 
    res.status(500).json({ message: 'Server error1' });
  }
};

module.exports = {
  login
};
