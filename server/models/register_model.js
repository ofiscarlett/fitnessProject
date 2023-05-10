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
const db_js_1 = __importDefault(require("../db.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user = {
    registerUser: (user_data) => __awaiter(void 0, void 0, void 0, function* () {
        // Hash the password before storing it in the database
        const hashedPassword = yield bcryptjs_1.default.hash(user_data.passwd, 10);
        // Check if the username already exists in the database
        const query_check_username = `SELECT * FROM users WHERE username = $1`;
        const result_check_username = yield db_js_1.default.query(query_check_username, [user_data.username]);
        if (result_check_username.rows.length > 0) {
            throw new Error('Username already exists');
        }
        else {
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
            const result = yield db_js_1.default.query(query, params);
            return result;
        }
    }),
    // from register to login 
    loginUser: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        // Query the database to check if the username exists
        const query = `SELECT TOP 1 FROM users WHERE username = $1`;
        const result = yield db_js_1.default.query(query, [username]);
        if (result.rowCount === 0) {
            // If username does not exist, return an error
            throw new Error('Invalid username or password');
        }
        // Compare password with the hashed password stored in the database
        const user = result.rows[0];
        const isMatch = yield bcryptjs_1.default.compare(password, user.passwd);
        if (!isMatch) {
            // If password does not match, return an error
            throw new Error('Invalid username or password');
        }
        // If username and password match, return the user object
        return user;
    }),
};
exports.default = user;
