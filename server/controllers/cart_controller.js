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
const express_1 = __importDefault(require("express"));
const cart_model_js_1 = __importDefault(require("../models/cart_model.js"));
const controller = express_1.default.Router();
controller.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    cart_model_js_1.default.getCart(userId).then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving cart.'
        });
    });
});
controller.post('/add-to-cart', (req, res) => {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    cart_model_js_1.default.addCourse(userId, courseId).then((data) => {
        res.send(data.rows[0]);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while adding course to cart.'
        });
    });
});
controller.post('/remove-from-cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    try {
        yield cart_model_js_1.default.removeCourse(courseId, userId);
        res.status(200).send({
            message: 'Course has been removed from cart!'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Some error occurred while removing course from cart.'
        });
    }
}));
controller.delete('/clear-cart/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    cart_model_js_1.default.clearCart(userId).then(() => {
        res.send({ message: "Cart cleared successfully!" });
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while clearing cart.'
        });
    });
});
exports.default = controller;
