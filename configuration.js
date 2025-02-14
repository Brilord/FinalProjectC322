const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "https://database-demo-latest.onrender.com";

function getHost() {
  return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
  if(localStorage.getItem("token")) {
    return true;} 
  else {
    return false;}
}

function saveTheToken(token) {
  localStorage.setItem("token", token);
  updateItemCart();
} 

function removeTheToken() {
 localStorage.removeItem("token");
 updateItemCart();
} 

function getTheToken() {
  return localStorage.getItem("token");
} 




let configuration = {
  isLoggedIn: () => isLoggedIn(), 
  host: () => getHost(), 
  token: () => getTheToken()    
};




async function updateItemCart() {
      let itemCount = 1; 
      document.getElementById("itemCount").textContent = itemCount;
}

function emptyBasket() {
  localStorage.removeItem("itemCount");
}



// async function updateTheNavigationBar() {
//     const navigation = document.getElementsByClassName("topnav")[0];
//     let loginTag = navigation.children[navigation.children.length - 1];
//     if(configuration.isLoggedIn()) {
//         loginTag.innerHTML = 
//         `<li class="right"><a  href="#" onclick="logout()">Logout</a></li>`;
//     } else {
//         loginTag.innerHTML = `<li class="right"><a  href="login.html">Login</a></li>`;
//     }
// }



async function signup() {
    let message = "";
    const token = getTheToken();
    let email = document.getElementById("signup-email").value;
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("password").value;
    let customer = {username: username, password: password, email: email}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": `application/json`,
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + `/signup`, request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            location.href = "login.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}




async function login() {  
      
    let username = document.getElementById("signin-username").value;
    let password = document.getElementById("signin-password").value;
    console.log(username + " " + password);
    let customer = {
        username: username, 
        password: password
    }
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/login", request);
        if(response.status == 200) {  
            alert("The login was successful!");
            const token = await response.text();
            saveTheToken(token);            
            location.href = "flower-list.html";
        } else {
            console.log(`response status:${response.status}`);   
            removeTheToken();         
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error); 
        removeTheToken();       
        alert("Something went wrong!");
      }    
}
async function getAllQuestions() {
    let host = configuration.host();
    const headers = { 
      'Authorization': `Bearer ${configuration.token()}`};
    return fetch(host + "/questions ", { headers })
      .then((response) => 
      {
        if(response.status == 401) {
          logout();
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
        alert("please login first");
        return [];
      });
  }
  async function getAllQuizzes() {
    let host = configuration.host();
    const headers = { 
      'Authorization': `Bearer ${configuration.token()}`};
    return fetch(host + "/quizzes ", { headers })
      .then((response) => 
      {
        if(response.status == 401) {
          logout();
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
        alert("please login first");
        return [];
      });
  }

  function addBasket(flowerId) {
    return;
  }
  
  
  
  async function getAll() {
    let response = await fetch(host_local + "/flowers", {
  });
    let result = await response.json();
    return result;
  }
  




async function logout() {   
    removeTheToken();  
}