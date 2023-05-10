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
function checkIfUsernameExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = yield db_js_1.default.query(query, [username]);
        return result.rows.length > 0;
    });
}
function getUserPassword(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT passwd FROM users WHERE username = $1';
        const result = yield db_js_1.default.query(query, [username]);
        if (result.rows.length === 0) {
            throw new Error('Password not found');
        }
        return result.rows[0].passwd;
    });
}
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Query the database to check if the username exists
    let output = yield checkIfUsernameExists(username);
    if (output) {
        // If username does not exist, return an error
        const password_db = yield getUserPassword(username);
        const matched = yield bcryptjs_1.default.compare(password, password_db);
        if (matched) {
            const userDetails = yield db_js_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
            return userDetails.rows[0];
        }
        else {
            throw new Error('Invalid username or password');
        }
    }
    else {
        throw new Error('Invalid username or password');
    }
});
exports.default = loginUser;
