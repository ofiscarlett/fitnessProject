// class Register {
//     #backendurl = "";
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
var _Register_backendurl;
//     constructor(backendurl: string) {
//         this.#backendurl = backendurl;
//     }
//     addRegisteredUser = async (formObject: object) => {
//         fetch(this.#backendurl, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formObject)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//             })
//     }
// }
class Register {
    constructor(backendurl) {
        _Register_backendurl.set(this, '');
        __classPrivateFieldSet(this, _Register_backendurl, backendurl, "f");
    }
    addRegisteredUser(formObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(__classPrivateFieldGet(this, _Register_backendurl, "f"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });
            if (response.ok) {
                // User was registered successfully
                alert('Registration successful!');
            }
            else {
                const data = yield response.json();
                alert(data.message);
            }
        });
    }
}
_Register_backendurl = new WeakMap();
export { Register };
