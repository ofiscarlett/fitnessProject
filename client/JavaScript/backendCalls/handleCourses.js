var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Courses_backendUrl, _Courses_readJson;
import { Course } from './course.js';
class Courses {
    constructor(backendUrl) {
        _Courses_backendUrl.set(this, "");
        this.getCourses = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Courses_backendUrl, "f"))
                    .then(response => response.json())
                    .then(response => {
                    __classPrivateFieldGet(this, _Courses_readJson, "f").call(this, response);
                    resolve(this.courses); //returns an array of Course objects created in the #readJson method
                })
                    .catch(error => {
                    reject(error);
                });
            }));
        });
        this.getCourseById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Courses_backendUrl, "f") + "/" + id)
                    .then(response => response.json())
                    .then(response => {
                    resolve(response); //returns a single Course object
                })
                    .catch(error => {
                    reject(error);
                });
            }));
        });
        _Courses_readJson.set(this, (json) => {
            json.forEach((course) => {
                this.courses.push(new Course(course.id_course, course.name_image1, course.extra_image2, course.extra_image3, course.extra_image4, course.video_name, course.course_name, course.trainer_name, course.course_description, course.weekdays, course.weekends, course.weekday_duration, course.weekend_duration, course.place, course.available_seats, course.price_month, course.price_year, course.trainer_image_name));
            });
        });
        this.courses = [];
        __classPrivateFieldSet(this, _Courses_backendUrl, backendUrl, "f");
    }
}
_Courses_backendUrl = new WeakMap(), _Courses_readJson = new WeakMap();
export { Courses };
