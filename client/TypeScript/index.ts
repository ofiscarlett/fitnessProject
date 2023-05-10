import { Cookies } from "./backendCalls/sendLoginData.js";
import { updateCartIcon } from "./modals.js";


// An event listener for frontpage blog article 'read more' links
const blogLinks: any = document.querySelectorAll(".blog-btn");

blogLinks.forEach((blogLink: any) => {
	blogLink.addEventListener("click", (event: Event) => {
		event.preventDefault();
		const cookie = new Cookies();
		const isLoggedIn = cookie.isCookieSet("session_token");
		if (isLoggedIn) {
			const id = (event.currentTarget as HTMLElement).getAttribute('data-id');
			window.location.href = `blogArticle.html?id=${id}`;
		} else {
			alert("You need to be logged in to read the full article");
		}
	});
});

// An event listener for the Join us now button
const joinUsButton = document.getElementById("joinUsNow") as HTMLButtonElement;

joinUsButton.addEventListener("click", (event: Event) => {
	event.preventDefault();
	const cookie = new Cookies();
	const isLoggedIn = cookie.isCookieSet("session_token");
	if (isLoggedIn) {
		window.location.href = "index.html";
	} else {
		const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
		registerModal.show();
	}
});

// An event listener for the course enroll buttons
const courseEnrollLinks: any = document.querySelectorAll("#enrollButton");

courseEnrollLinks.forEach((courseEnrollLink: any) => {
	courseEnrollLink.addEventListener("click", async (event: Event) => {
		event.preventDefault();
		const cookie = new Cookies();
		const isLoggedIn = cookie.isCookieSet("session_token");

		if (isLoggedIn) {
			// adds the number of items in the cart to the cart icon
			let itemsInCart: number = parseInt(localStorage.getItem("itemsInCart") || "0");
			itemsInCart++;
			localStorage.setItem("itemsInCart", String(itemsInCart));

			updateCartIcon(itemsInCart)

			// Send post request to add the course in cart
			const token = cookie.getCookie("session_token");
			const decodedToken = JSON.parse(atob(token.split('.')[1]));
			const userId = decodedToken.userid;
			const courseId = (event.currentTarget as HTMLElement).getAttribute('data-id');
			try {
				const response = await fetch(`http://localhost:3001/cart/add-to-cart`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userId, courseId }),
				});
				if (response.ok) {
					alert("Course added to shopping cart!");
				} else {
					alert("There was an error adding the course to the shopping cart");
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("You need to be logged in to enroll in a course");
		}
	});
});




