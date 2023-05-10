"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const story_model_js_1 = __importDefault(require("../models/story_model.js"));
const controller = express_1.default.Router();
const secretKey = process.env.SECRET_KEY;
controller.get('/', (req, res) => {
    story_model_js_1.default.getAllStories().then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.'
        });
    });
});
controller.get('/:id', (req, res) => {
    //get token from request header
    const token = req.headers.authorization;
    if (!token || token.toLowerCase() === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
        return;
    }
    const decoded = jsonwebtoken_1.default.decode(token.split(' ')[1]);
    const userId = decoded.userid;
    story_model_js_1.default.getStoryById(parseInt(req.params.id), userId).then((data) => {
        res.send(data.rows[0]);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.' + error.message
        });
    });
});
controller.post('/new', (req, res) => {
    story_model_js_1.default.addNewStory(req.body).then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while posting story.'
        });
    });
});
//Post a comment to a story
controller.post('/newcomment', (req, res) => {
    //get token from request header
    const token = req.headers.authorization;
    if (!token || token.toLowerCase() === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
        return;
    }
    const decoded = jsonwebtoken_1.default.decode(token.split(' ')[1]);
    const userId = decoded.userid;
    const username = decoded.username;
    story_model_js_1.default.addStoryComment(req.body, userId).then((data) => {
        // add username for each row
        data.rows.forEach((row) => {
            row.username = username;
            row.canDelete = true;
        });
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while posting story comment.'
        });
    });
});
controller.post('/newreaction', (req, res) => {
    //get token from request header
    const token = req.headers.authorization;
    if (!token || token.toLowerCase() === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
        return;
    }
    const decoded = jsonwebtoken_1.default.decode(token.split(' ')[1]);
    const userId = decoded.userid;
    const username = decoded.username;
    story_model_js_1.default.addStoryReaction(req.body, userId).then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while posting story reaction. ' + error.message
        });
    });
});
// Delete a comment from a story
controller.delete('/deletecomment/:id', (req, res) => {
    //get token from request header
    const token = req.headers.authorization;
    if (!token || token.toLowerCase() === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
        return;
    }
    const decoded = jsonwebtoken_1.default.decode(token.split(' ')[1]);
    const userId = decoded.userid;
    story_model_js_1.default.deleteStoryComment(parseInt(req.params.id), userId).then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while deleting story comment.'
        });
    });
});
// Delete reaction from a story
controller.delete('/deletereaction/:story/:type', (req, res) => {
    //get token from request header
    const token = req.headers.authorization;
    if (!token || token.toLowerCase() === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
        return;
    }
    const decoded = jsonwebtoken_1.default.decode(token.split(' ')[1]);
    const userId = decoded.userid;
    story_model_js_1.default.deleteStoryReaction(userId, parseInt(req.params.story), req.params.type).then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while deleting story reaction.'
        });
    });
});
exports.default = controller;
