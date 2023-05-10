"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_model_js_1 = __importDefault(require("../models/register_model.js"));
const controller = express_1.default.Router();
controller.post('/', (req, res) => {
    register_model_js_1.default.registerUser(req.body)
        .then((data) => {
        res.send(data);
    })
        .catch((error) => {
        if (error.message === 'Username already exists') {
            res.status(400).send({
                message: 'Username already exists. Please choose a different username.'
            });
        }
        else {
            res.status(500).send({
                message: 'Some error occurred while registering the user.'
            });
        }
    });
});
exports.default = controller;
