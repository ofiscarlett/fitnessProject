import express from 'express';
import register from '../models/register_model.js';

const controller = express.Router();

controller.post('/', (req, res) => {
    register.registerUser(req.body)
        .then((data: any) => {
            res.send(data);
        })
        .catch((error: any) => {
            if (error.message === 'Username already exists') {
                res.status(400).send({
                    message: 'Username already exists. Please choose a different username.'
                });
            } else {
                res.status(500).send({
                    message: 'Some error occurred while registering the user.'
                });
            }
        });
});
export default controller;