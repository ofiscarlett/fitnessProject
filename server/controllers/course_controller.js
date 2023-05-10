"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_model_js_1 = __importDefault(require("../models/course_model.js"));
const controller = express_1.default.Router();
controller.get('/', (req, res) => {
    course_model_js_1.default.getAllCourses().then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving courses.'
        });
    });
});
controller.get('/:id', (req, res) => {
    course_model_js_1.default.getCourseById(parseInt(req.params.id)).then((data) => {
        res.send(data.rows[0]);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving courses.'
        });
    });
});
exports.default = controller;
