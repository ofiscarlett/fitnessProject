"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_model_1 = __importDefault(require("../models/login_model"));
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const controller = express_1.default.Router();
// Login route
controller.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        // Verify the username and password of the user trying to log in
        const user = yield (0, login_model_1.default)(userName, password);
        const token = jsonwebtoken_1.default.sign({ username: user.username, userid: user.id_user }, secretKey, { expiresIn: '30m' });
        const response = {
            token: token,
            message: 'Login successful',
            success: true
        };
        res.status(200).send(response);
    }
    catch (err) {
        const response = {
            message: 'Login error',
            success: false
        };
        res.status(401).send('Authentication failed');
    }
}));
// Route to handle protected content
controller.get('/protected', (req, res) => {
    // Check if the user has a valid session token
    const token = req.cookies['session_token'];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        res.status(200).send(`Hello ${decoded.username}, you have access to protected content`);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).send('Session expired. Please log in again.');
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).send('Invalid token. Please log in again.');
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
});
exports.default = controller;
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
