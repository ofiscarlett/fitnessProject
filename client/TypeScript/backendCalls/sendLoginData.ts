export class Login {
  #backendurl = "";

  constructor(backendurl: string) {
      this.#backendurl = backendurl;
  }   
  sendLoginData = async (formObject:any) => {
    console.dir(formObject);
    fetch(this.#backendurl + '/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userName": formObject.username,
          "password":formObject.password
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
      if(resultJSON_Object.success){
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
  }
}

export class Cookies {
  setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  getCookie = (name: any) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  // this is used to check if user is logged in with cookie name session token
  isCookieSet = (name) => {
    if(this.getCookie(name) == null){
      return false;
    }
    return true;
  }
}
     



