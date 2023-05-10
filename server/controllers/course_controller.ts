import express from 'express';
import course from '../models/course_model.js';

const controller = express.Router();

controller.get('/', (req, res) => {
    course.getAllCourses().then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving courses.'
        });
    });
});

controller.get('/:id', (req, res) => {
    course.getCourseById(parseInt(req.params.id)).then((data: any) => {
        res.send(data.rows[0]);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving courses.'
        });
    });
});

export default controller;
