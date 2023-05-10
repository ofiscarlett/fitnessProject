var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Courses } from './backendCalls/handleCourses.js';
import { Cookies } from "./backendCalls/sendLoginData.js";
import { updateCartIcon } from './modals.js';
const backendUrl = "http://localhost:3001/course";
const courses = new Courses(backendUrl);
const courseName = document.getElementById("navcourseName");
const courseTitle = document.getElementById("courseTitle");
//const courseVideo = document.getElementById("courseVideo") as HTMLVideoElement;
const courseTrainer_image_name = document.getElementById("trainerImage");
const courseTrainerName = document.getElementById("courseTrainerName");
const courseDescription = document.getElementById("courseDescription");
const scheduleWeekday = document.getElementById("scheduleWeekday");
const scheduleWeekend = document.getElementById("scheduleWeekend");
const courseTimeWeek = document.getElementById("courseTimeWeek");
const courseTimeWeekend = document.getElementById("courseTimeWeekend");
const courseAvailability = document.getElementById("courseAvailability");
const coursePriceMonth = document.getElementById("coursePriceMonth");
const queryParams = new URLSearchParams(window.location.search);
const id_course = Number(queryParams.get('id'));
// get the course with given id from the database
courses.getCourseById(id_course).then((course) => {
    renderCourse(course);
})
    .catch((error) => {
    alert(error);
});
const renderCourse = (course) => {
    courseName.innerText = course.course_name;
    courseTitle.innerText = course.course_name;
    //courseVideo.src = `./images/${course.video_name}`;
    courseTrainer_image_name.src = `./images/${course.trainer_image_name}`;
    courseTrainerName.innerText = course.trainer_name;
    courseDescription.innerText = course.course_description;
    scheduleWeekday.innerText = course.weekdays;
    scheduleWeekend.innerText = course.weekends;
    courseTimeWeek.innerText = course.weekday_duration;
    courseTimeWeekend.innerText = course.weekend_duration;
    courseAvailability.innerText = course.available_seats.toString();
    coursePriceMonth.innerText = `${course.price_month} € / Month`;
    //courseImages2.src = `./images/${course.extra_image2}`;
    //courseImages3.src = `./images/${course.extra_image3}`;
    //courseImages4.src = `./images/${course.extra_image4}`;
    //coursePrice.innerText = `$ ${course.price_year}`; 
};
const enrollButton = document.getElementById("courseEnrollButton");
enrollButton.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const cookie = new Cookies();
    const isLoggedIn = cookie.isCookieSet("session_token");
    if (isLoggedIn) {
        const token = cookie.getCookie("session_token");
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userid;
        const courseId = id_course;
        try {
            const response = yield fetch(`http://localhost:3001/cart/add-to-cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, courseId }),
            });
            if (response.ok) {
                alert("Course added to shopping cart!");
            }
            else {
                alert("Something went wrong");
            }
        }
        catch (error) {
            alert(error);
        }
    }
    else {
        alert("Please register and log in first!");
    }
}));
let itemsInCart = parseInt(localStorage.getItem("itemsInCart") || "0");
enrollButton.addEventListener("click", () => {
    const cookie = new Cookies();
    const isLoggedIn = cookie.isCookieSet("session_token");
    if (isLoggedIn) {
        itemsInCart++;
        localStorage.setItem("itemsInCart", String(itemsInCart));
        updateCartIcon(itemsInCart);
    }
});
