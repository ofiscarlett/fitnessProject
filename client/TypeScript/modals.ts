import { Login, Cookies } from './backendCalls/sendLoginData.js';
import { Register } from './backendCalls/sendRegisterData.js';

const backendUrlcart = "http://localhost:3001/cart";
const backendUrlRegister = "http://localhost:3001/register";
const register = new Register(backendUrlRegister);

const registerForm = document.getElementById("registerForm") as HTMLFormElement;
const passwordInput = document.getElementById('passwd') as HTMLInputElement;
const confirmPasswordInput = document.getElementById('passwd2') as HTMLInputElement;
const loginForm = document.getElementById("loginForm") as HTMLFormElement;

// Check if there is 'itemsIncart' in the local storage and if not, set number in cart icon it to 0
if (localStorage.getItem('itemsInCart') === null) {
    document.getElementById('total-Items').textContent = '0';
} else {
    document.getElementById('total-Items').textContent = localStorage.getItem('itemsInCart');
}

//these variables create the login and register modals
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

// Form validation for register form
registerForm.addEventListener('submit', (event: Event) => {
	if (!registerForm.checkValidity()) {
		event.preventDefault();
		event.stopPropagation();
	}
	registerForm.classList.add('was-validated');
});

registerForm.addEventListener('input', (event) => {
	if (registerForm.checkValidity() && passwordInput.value === confirmPasswordInput.value) {
		document.querySelector('#submitRegisterData').removeAttribute('disabled');
		confirmPasswordInput.classList.remove('is-invalid');
	} else {
		document.querySelector('#submitRegisterData').setAttribute('disabled', '');
		confirmPasswordInput.classList.add('is-invalid');
	}
});

confirmPasswordInput.addEventListener('input', (event) => {
	if (registerForm.checkValidity() && passwordInput.value === confirmPasswordInput.value) {
		document.querySelector('#submitRegisterData').removeAttribute('disabled');
	} else {
		confirmPasswordInput.classList.add('is-invalid');
		document.querySelector('#submitRegisterData').setAttribute('disabled', '');
	}
});

// sending the register data to the backend
registerForm.addEventListener("submit", (event: Event) => {
	event.preventDefault();

	const formData = new FormData(registerForm);
	const formObject = {};
	formData.forEach((value, key) => {
		formObject[key] = value;
	});

	register.addRegisteredUser(formObject);
});
// login functionality
loginForm.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!loginForm.checkValidity()) {
        loginForm.classList.add('was-validated');
        return;
    }
    loginModal.hide();
    loginForm.classList.add('was-validated');
    if (loginForm.checkValidity()) {
        try {
            const login = new Login("http://localhost:3001")
            const form = document.getElementById('loginForm') as HTMLFormElement;
            const formData = new FormData(form);
            const username = formData.get('userName');
            const password = formData.get('password');
            login.sendLoginData({
                "username": username,
                "password": password
            });
        } catch (error) {
            // Display an error message
            console.error(error);
            alert('An error occurred while logging in. Please try again.');
        }
    }
}, false);

const modals = () => {
    //these variables determine the button elements in the html to handle the modals
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
    const linkToLogin: any = document.getElementById('toLogin');
    const linkToRegister: any = document.getElementById('toRegister');
    
    //these event listeners handle the buttons and opens and closes the modals

    // login button event listener
    registerButton.addEventListener('click', () => {
        registerModal.show();
    });

    loginButton.addEventListener('click', () => {
        loginModal.show();
    });

    linkToLogin.addEventListener('click', () => {
        registerModal.hide();
        loginModal.show();
    });

    linkToRegister.addEventListener('click', () => {
        loginModal.hide();
        registerModal.show();
    });

    const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;
    logoutButton.addEventListener('click', () => {
        const cookie = new Cookies();
        const token = cookie.getCookie('session_token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
		const userId = decodedToken.userid;
        
        // Empty cart when logging out
        fetch(`${backendUrlcart}/clear-cart/${userId}` , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        //put the response message in alert
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Empty local storage
        localStorage.clear();

        // Delete session token cookie
        const cookies = new Cookies();
        cookies.setCookie('session_token', '', -1);
        window.location.reload();
    });
}

const loginLogout = () => {
    const cookies = new Cookies();
    cookies.getCookie('session_token');
    //todo:validate token
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;
    if (cookies.getCookie('session_token') == null) {
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
    } else {
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
    }
}

modals();
loginLogout();

//this function updates the cart icon with the number of items in the cart
export const updateCartIcon = (items: number) => {
    document.getElementById('total-Items').textContent = String(items);
};

