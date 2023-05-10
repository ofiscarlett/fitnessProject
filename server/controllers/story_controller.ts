import express from 'express';
import jwt from 'jsonwebtoken';
import story from '../models/story_model.js';

const controller = express.Router();
const secretKey = process.env.SECRET_KEY as string;

controller.get('/', (req, res) => {
    story.getAllStories().then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
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
    
    const decoded = jwt.decode(token.split(' ')[1]);
    const userId = (decoded as any).userid;

    story.getStoryById(parseInt(req.params.id), userId).then((data: any) => {
        res.send(data.rows[0]);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.' + error.message
        });
    });
});


controller.post('/new', (req, res) => {
    story.addNewStory(req.body).then((data: any) => {
        res.send(data.rows);
    
    }).catch((error: any) => {
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
    
    const decoded = jwt.decode(token.split(' ')[1]);
    const userId = (decoded as any).userid;
    const username = (decoded as any).username;

    story.addStoryComment(req.body, userId).then((data: any) => {
        // add username for each row
        data.rows.forEach((row: any) => {
            row.username = username;
            row.canDelete = true;
        });
        res.send(data.rows);

    }).catch((error: any) => {
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
    
    const decoded = jwt.decode(token.split(' ')[1]);
    const userId = (decoded as any).userid;
    const username = (decoded as any).username;

    story.addStoryReaction(req.body, userId).then((data: any) => {
        res.send(data.rows);
    
    }).catch((error: any) => {
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
    
    const decoded = jwt.decode(token.split(' ')[1]);
    const userId = (decoded as any).userid;
    
    story.deleteStoryComment(parseInt(req.params.id), userId).then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
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
    
    const decoded = jwt.decode(token.split(' ')[1]);
    const userId = (decoded as any).userid;

    story.deleteStoryReaction(userId, parseInt(req.params.story), req.params.type).then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while deleting story reaction.'
        });
    });
});

export default controller;