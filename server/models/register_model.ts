import { query } from 'express';
import pool from '../db.js'
import bcrypt from 'bcryptjs';

const user = {
    registerUser: async (user_data: any) => {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(user_data.passwd, 10);
      
         // Check if the username already exists in the database
         const query_check_username = `SELECT * FROM users WHERE username = $1`;
         const result_check_username = await pool.query(query_check_username, [user_data.username]);
        
         if (result_check_username.rows.length > 0) {
             throw new Error('Username already exists');
         }else{
            // Query the database to insert the user data
        const query = `INSERT INTO users (
            firstname,
            lastname,
            email,
            username,
            passwd,
            street_address,
            postal_code,
            city,
            phone_number
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
          const params = [
            user_data.firstname,
            user_data.lastname,
            user_data.email,
            user_data.username,
            hashedPassword,
            user_data.street_address,
            user_data.postal_code,
            user_data.city,
            user_data.phone_number
            ];
        const result = await pool.query(query,params);
        return result;
        }
    },
    
    // from register to login 
    loginUser: async (username:any, password:any) => {
        // Query the database to check if the username exists
        const query = `SELECT TOP 1 FROM users WHERE username = $1`;
        const result = await pool.query(query, [username]);
    
        if (result.rowCount === 0) {
          // If username does not exist, return an error
          throw new Error('Invalid username or password');
        }
    
        // Compare password with the hashed password stored in the database
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.passwd);
    
        if (!isMatch) {
          // If password does not match, return an error
          throw new Error('Invalid username or password');
        }
    
        // If username and password match, return the user object
        return user;
      },
    };

export default user;
