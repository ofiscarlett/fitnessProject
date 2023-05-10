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
var _Login_backendurl;
export class Login {
    constructor(backendurl) {
        _Login_backendurl.set(this, "");
        this.sendLoginData = (formObject) => __awaiter(this, void 0, void 0, function* () {
            console.dir(formObject);
            fetch(__classPrivateFieldGet(this, _Login_backendurl, "f") + '/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "userName": formObject.username,
                    "password": formObject.password
                })
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
                .then(responseText => {
                const resultJSON_Object = JSON.parse(responseText);
                if (resultJSON_Object.success) {
                    alert("Login successful. Welcome " + formObject.username + "!");
                    const cookie = new Cookies();
                    cookie.setCookie("session_token", resultJSON_Object.token, 1);
                    window.location.reload();
                }
            })
                .catch(error => {
                console.error(error);
                alert("Error occured while logging in");
            });
        });
        __classPrivateFieldSet(this, _Login_backendurl, backendurl, "f");
    }
}
_Login_backendurl = new WeakMap();
export class Cookies {
    constructor() {
        this.setCookie = (name, value, days) => {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        };
        this.getCookie = (name) => {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0)
                    return c.substring(nameEQ.length, c.length);
            }
            return null;
        };
        // this is used to check if user is logged in with cookie name session token
        this.isCookieSet = (name) => {
            if (this.getCookie(name) == null) {
                return false;
            }
            return true;
        };
    }
}
