import pool from '../db.js'

const course = {
    getAllCourses: async () => {
        const result = await pool.query('SELECT * FROM courses');
        return result;
    },
    getCourseById: async (id: number) => {
        const result = await pool.query('SELECT * FROM courses WHERE id_course = $1', [id]);
        return result;
    },
}

export default course;