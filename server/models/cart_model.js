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
const cart = {
    getCart: (user_id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [user_id]);
        return result;
    }),
    addCourse: (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [userId, courseId]);
        return result;
    }),
    removeCourse: (courseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('DELETE FROM cart WHERE id_course = $1 AND id_user = $2', [courseId, userId]);
        return result;
    }),
    clearCart: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('DELETE FROM cart WHERE id_user = $1', [userId]);
        return result;
    }),
};
exports.default = cart;
