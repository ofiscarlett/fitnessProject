var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Cookies } from "./backendCalls/sendLoginData.js";
import { updateCartIcon } from "./modals.js";
// An event listener for frontpage blog article 'read more' links
const blogLinks = document.querySelectorAll(".blog-btn");
blogLinks.forEach((blogLink) => {
    blogLink.addEventListener("click", (event) => {
        event.preventDefault();
        const cookie = new Cookies();
        const isLoggedIn = cookie.isCookieSet("session_token");
        if (isLoggedIn) {
            const id = event.currentTarget.getAttribute('data-id');
            window.location.href = `blogArticle.html?id=${id}`;
        }
        else {
            alert("You need to be logged in to read the full article");
        }
    });
});
// An event listener for the Join us now button
const joinUsButton = document.getElementById("joinUsNow");
joinUsButton.addEventListener("click", (event) => {
    event.preventDefault();
    const cookie = new Cookies();
    const isLoggedIn = cookie.isCookieSet("session_token");
    if (isLoggedIn) {
        window.location.href = "index.html";
    }
    else {
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        registerModal.show();
    }
});
// An event listener for the course enroll buttons
const courseEnrollLinks = document.querySelectorAll("#enrollButton");
courseEnrollLinks.forEach((courseEnrollLink) => {
    courseEnrollLink.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const cookie = new Cookies();
        const isLoggedIn = cookie.isCookieSet("session_token");
        if (isLoggedIn) {
            // adds the number of items in the cart to the cart icon
            let itemsInCart = parseInt(localStorage.getItem("itemsInCart") || "0");
            itemsInCart++;
            localStorage.setItem("itemsInCart", String(itemsInCart));
            updateCartIcon(itemsInCart);
            // Send post request to add the course in cart
            const token = cookie.getCookie("session_token");
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userid;
            const courseId = event.currentTarget.getAttribute('data-id');
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
                    alert("There was an error adding the course to the shopping cart");
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert("You need to be logged in to enroll in a course");
        }
    }));
});
