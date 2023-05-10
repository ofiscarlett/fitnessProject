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
import { Cookies } from './backendCalls/sendLoginData.js';
const backendUrl = "http://localhost:3001/course";
const shoppingCartUrl = "http://localhost:3001/cart";
const courses = new Courses(backendUrl);
const contentDiv = document.getElementById("content");
//get all stories from the database
const renderCourses = (course) => {
    const courseDiv = document.createElement("div");
    courseDiv.id = String(course.id_course);
    courseDiv.className = "courseId";
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    const courseImage = document.createElement("img");
    courseImage.className = "courseMainImage";
    courseImage.alt = "Product image";
    courseImage.src = `./images/${course.name_image1}`;
    productCard.appendChild(courseImage);
    const span = document.createElement("div");
    span.id = "priceInSpan";
    span.className = "ribbon ribbon-top-right";
    const price = document.createElement("span");
    price.innerHTML = "$ " + String(course.price_month) + " / month";
    span.appendChild(price);
    productCard.appendChild(span);
    const courseName = document.createElement("h3");
    courseName.id = "courseTitle";
    courseName.innerHTML = course.course_name;
    productCard.appendChild(courseName);
    const courseDescript = document.createElement("p");
    courseDescript.id = "courseDescription";
    courseDescript.innerHTML = course.course_description;
    productCard.appendChild(courseDescript);
    const viewMore = document.createElement("a");
    viewMore.href = "courseDetails.html?id=" + course.id_course;
    viewMore.className = "view-more";
    viewMore.innerHTML = "View more";
    productCard.appendChild(viewMore);
    const enrollBtn = document.createElement("button");
    enrollBtn.className = "buy-btn";
    enrollBtn.innerHTML = "Enroll now";
    productCard.appendChild(enrollBtn);
    const starContainer = document.createElement("div");
    starContainer.className = "star-container";
    starContainer.innerHTML = `
	  <span class="fa fa-star checked"></span>
	  <span class="fa fa-star checked"></span>
	  <span class="fa fa-star checked"></span>
	  <span class="fa fa-star checked"></span>
	  <span class="fa fa-star"></span>`;
    productCard.appendChild(starContainer);
    courseDiv.appendChild(productCard);
    contentDiv.appendChild(courseDiv);
    const button = courseDiv.querySelector(".buy-btn");
    console.log(button);
    if (button) {
        button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            const cookie = new Cookies();
            const isLoggedIn = cookie.isCookieSet("session_token");
            if (isLoggedIn) {
                const token = cookie.getCookie("session_token");
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.id_user;
                const courseId = course.id_course;
                const courseName = course.course_name;
                const coursePrice = course.price_month;
                const cartItem = { courseId, courseName, coursePrice };
                try {
                    const response = yield fetch(`${shoppingCartUrl}/add-to-cart`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        //4/26 change, due to it put course id as user id, change this and the backend code 
                        body: JSON.stringify({ userId, courseId }),
                    });
                    if (response.ok) {
                        alert("Course added to shopping cart!");
                        const existingCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
                        existingCartItems.push(cartItem);
                        localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
                    }
                    else {
                        alert("There was an error adding the course to the shopping cart");
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                alert("You need to be logged in to add a course to the shopping cart");
            }
        }));
    }
};
courses.getCourses().then((courses) => {
    courses.forEach((course) => {
        renderCourses(course);
    });
})
    .catch((error) => {
    console.log(error);
});
//display count of itmes in the shopping cart
const existingCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
const shoppingCartIcon = document.querySelector(".fa-shopping-cart");
shoppingCartIcon.innerHTML = existingCartItems.length.toString();
//put into shopping cart page
const shoppingCartDiv = document.getElementById("shopping-cart");
shoppingCartDiv.innerHTML = "";
existingCartItems.forEach((cartItem) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    const courseImage = document.createElement("img");
    courseImage.className = "courseMainImage";
    courseImage.alt = "Product image";
    courseImage.src = . / images / $;
    {
        cartItem.courseName;
    }
    jpg;
    cartItemDiv.appendChild(courseImage);
    const courseName = document.createElement("h3");
    courseName.innerHTML = cartItem.courseName;
    cartItemDiv.appendChild(courseName);
    const coursePrice = document.createElement("span");
    coursePrice.innerHTML = "$ " + cartItem.coursePrice;
    cartItemDiv.appendChild(coursePrice);
    shoppingCartDiv.appendChild(cartItemDiv);
    // Clear shopping cart
    const clearCartBtn = document.getElementById("clear-cart-btn");
    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cartItems");
        shoppingCartIcon.innerHTML = "0";
        shoppingCartDiv.innerHTML = "";
    });
});
