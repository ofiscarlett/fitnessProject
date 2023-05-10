import pool from '../db.js'
import bcrypt from 'bcryptjs';

async function checkIfUsernameExists(username:any) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows.length > 0;
}

async function getUserPassword(username:any) {
  const query = 'SELECT passwd FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);
  if (result.rows.length === 0) {
    throw new Error('Password not found');
  }
  return result.rows[0].passwd;
}

const loginUser = async (username:any, password:any) => {
    // Query the database to check if the username exists

    let output= await checkIfUsernameExists(username)
    if (output) {
      // If username does not exist, return an error
      const password_db =await getUserPassword(username)
      const matched = await bcrypt.compare(password, password_db)
      if(matched) {
        const userDetails = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return userDetails.rows[0];
      }
      else{
        throw new Error('Invalid username or password');
      }
    }else{
      throw new Error('Invalid username or password');
    }
};
export default loginUser;