import pool from '../db.js'
import user from './register_model.js';

const cart = {
    getCart: async (user_id: number) => {
        const result = await pool.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [user_id]);
        return result;
    },
    addCourse: async (userId: number, courseId: number) => {
        const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [userId, courseId]);
        return result;
    },
    removeCourse: async (courseId: number, userId: number) => {
        const result = await pool.query('DELETE FROM cart WHERE id_course = $1 AND id_user = $2', [courseId, userId]);
        return result;
    },
    clearCart: async (userId: number) => {
        const result = await pool.query('DELETE FROM cart WHERE id_user = $1', [userId]);
        return result;
    },

};




export default cart;