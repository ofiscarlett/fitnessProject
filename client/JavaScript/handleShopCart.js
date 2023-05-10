var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import the necessary classes from backendCalls folder
import { Cookies } from './backendCalls/sendLoginData.js';
import { updateCartIcon } from "./modals.js";
// URL of the backend endpoint      
const shoppingCartUrl = "http://localhost:3001/cart";
const cartContentDiv = document.getElementById("cart-content");
const totalPriceDiv = document.getElementById("total-price");
const proceedToPay = document.querySelector('proceed-pay');
// Get user id from cookie
const cookie = new Cookies();
const isLoggedIn = cookie.isCookieSet("session_token");
if (isLoggedIn) {
    const token = cookie.getCookie("session_token");
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.userid;
    // Fetch the cart items from backend
    fetch(`${shoppingCartUrl}/${userId}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Unable to retrieve cart items.");
        }
        return response.json();
    })
        .then((cartItems) => {
        // Check if there are items in cart; if not, shows message in cart page
        if (cartItems.length === 0) {
            const emptyCartInfo = document.createElement("h3");
            emptyCartInfo.innerHTML = "You have no courses in your shopping cart";
            cartContentDiv.appendChild(emptyCartInfo);
            totalPriceDiv.innerHTML = `Total price: 0`;
        }
        else {
            cartItems.forEach((cartItem) => {
                renderCartItem(cartItem);
            });
            // Calculate total price
            const totalPrice = cartItems.reduce((total, cartItem) => {
                const itemPrice = parseFloat(cartItem.price_month);
                return total + itemPrice;
            }, 0);
            if (isNaN(totalPrice)) {
                totalPriceDiv.innerHTML = `Total price: 0`;
            }
            else {
                totalPriceDiv.innerHTML = `Total price: ${totalPrice} €`;
            }
        }
    })
        .catch((error) => {
        alert(error);
    });
}
else {
    alert("Please login to add courses to your shopping cart");
}
const renderCartItem = (cartItem) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.id = cartItem.id_course.toString();
    ;
    cartItemDiv.className = "cart-item";
    const cartItemImage = document.createElement("div");
    cartItemImage.className = "cart-item-image";
    const cartItemImageImg = document.createElement("img");
    cartItemImageImg.src = `./images/${cartItem.name_image1}`;
    cartItemImage.appendChild(cartItemImageImg);
    cartItemDiv.appendChild(cartItemImage);
    const cartItemDetails = document.createElement("div");
    cartItemDetails.className = "cart-item-details";
    const cartItemDetailsName = document.createElement("h3");
    cartItemDetailsName.innerHTML = cartItem.course_name;
    const cartItemDetailsRemove = document.createElement("div");
    cartItemDetailsRemove.className = "cart-item-remove";
    const cartItemDetailsRemoveBtn = document.createElement("button");
    cartItemDetailsRemoveBtn.className = "removeCourse";
    cartItemDetailsRemoveBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    cartItemDetailsRemoveBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        if (isLoggedIn) {
            // removes one item from the cart icon
            let itemsInCart = parseInt(localStorage.getItem("itemsInCart") || "0");
            itemsInCart--;
            localStorage.setItem("itemsInCart", String(itemsInCart));
            updateCartIcon(itemsInCart);
            // Send post request to remove the course from cart
            const token = cookie.getCookie("session_token");
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userid;
            const courseId = cartItem.id_course;
            try {
                const response = yield fetch(`${shoppingCartUrl}/remove-from-cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ courseId, userId }),
                });
                if (response.ok) {
                    alert("Course removed from shopping cart!");
                    window.location.reload(); // reload the page to show updated shopping cart
                }
                else {
                    alert("There was an error removing the course from the shopping cart");
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert("You need to be logged in to remove a course from the shopping cart");
        }
    }));
    cartItemDetailsRemove.appendChild(cartItemDetailsRemoveBtn);
    cartItemDetails.appendChild(cartItemDetailsName);
    cartItemDetails.appendChild(cartItemDetailsRemove);
    cartItemDiv.appendChild(cartItemDetails);
    const cartItemPrice = document.createElement("div");
    cartItemPrice.className = "cart-item-price";
    const price = document.createElement("h3");
    price.innerHTML = String(cartItem.price_month) + " €";
    cartItemPrice.appendChild(price);
    cartItemDiv.appendChild(cartItemPrice);
    cartContentDiv.appendChild(cartItemDiv);
};
// An event listener for the course enroll buttons in the course cards
const courseEnrollLinks = document.querySelectorAll(".buy-btn");
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
            location.reload();
        }
        else {
            alert("You need to be logged in to enroll in a course");
        }
    }));
});
