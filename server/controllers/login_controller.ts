// Import dependencies
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import loginUser from '../models/login_model';
import { config } from 'dotenv';
//import cookieParser from 'cookie-parser';
import pool from '../db.js';
import bcrypt from 'bcryptjs';

require('dotenv').config();

const secretKey = process.env.SECRET_KEY as string;
const controller = express.Router();

// Login route
controller.post('/', async (req, res) => {
  const { userName, password } = req.body;

  try {
     // Verify the username and password of the user trying to log in
    const user = await loginUser(userName, password);
    const token = jwt.sign({username: user.username, userid: user.id_user}, secretKey, {expiresIn: '30m'});
    const response = { 
      token: token,
      message: 'Login successful',
      success: true
    };
    res.status(200).send(response);
  } catch (err) {
    const response = {
      message: 'Login error',
      success: false
    };
    res.status(401).send('Authentication failed');
  }
});

// Route to handle protected content
controller.get('/protected', (req, res) => {
  // Check if the user has a valid session token
  const token = req.cookies['session_token'];
  

  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    res.status(200).send(`Hello ${decoded.username}, you have access to protected content`);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send('Session expired. Please log in again.');
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).send('Invalid token. Please log in again.');
    } else {
      res.status(401).send('Unauthorized');
    }
  }
});
export default controller;

 
//   // Call loginUser function from the model
//   loginUser(username, password)
//     .then((user) => {
//       // If login successful, you can generate a JWT 
//       const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '30m' });
//       res.status(200).json({ message: 'Login successful', token, username: user.username });
      
//     })
//     .catch((error) => {
//       // If login fails, return an error response
//       res.status(401).json({ message: 'invalid username or password' });
//     });
// });
// controller.post('/logout', (req, res) => {
//     // You can clear the user's JWT token from the client-side by removing the token from the browser's local storage
//     // res.clearCookie('token');
//     localStorage.removeItem('token')
//     res.status(200).json({ message: 'Logout successful' });
//   });