// class Register {
//     #backendurl = "";

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
    #backendurl = '';

    constructor(backendurl: string) {
      this.#backendurl = backendurl;
    }
  
    async addRegisteredUser(formObject: object) {
        const response = await fetch(this.#backendurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formObject)
        });
  
        if (response.ok) {
            // User was registered successfully
            alert('Registration successful!');
          } else {
            const data = await response.json();
            alert(data.message);
          }
        }
      }

export { Register };