import express from 'express';
import cart from '../models/cart_model.js';

const controller = express.Router();

controller.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  cart.getCart(userId).then((data: any) => {
    res.send(data.rows);
  }).catch((error: any) => {
    res.status(500).send({
      message: 'Some error occurred while retrieving cart.'
    });
  });
});

controller.post('/add-to-cart', (req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;
  cart.addCourse(userId, courseId).then((data: any) => {
    res.send(data.rows[0]);
  }).catch((error: any) => {
    res.status(500).send({
      message: 'Some error occurred while adding course to cart.'
    });
  });
});

controller.post('/remove-from-cart', async(req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;
  try{
    await cart.removeCourse( courseId, userId);
    res.status(200).send({
      message: 'Course has been removed from cart!'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Some error occurred while removing course from cart.'    
  });
  }
});

controller.delete('/clear-cart/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  cart.clearCart(userId).then(() => {
    res.send({ message: "Cart cleared successfully!" });
  }).catch((error: any) => {
    res.status(500).send({
      message: 'Some error occurred while clearing cart.'
    });
  });
});

export default controller;