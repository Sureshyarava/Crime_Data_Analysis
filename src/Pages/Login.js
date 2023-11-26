import React from "react";
import '../Css/login.css';
import Footer from "../Footer";
import setCookie from "./SetCookieJs";

export default function Login() {
    return (
        <div className="login">
            <header className="header-login">
                <nav>
                    <ul className="navbar-login">
                        <li><h2>Analytics Sign in/up </h2></li>
                        <div id="utility">
                        <li><a href="/">Home</a></li>
                        <li><a href="/documentation">Documentation</a></li>
                        <li><a href="/about">About</a></li>
                        </div>
                    </ul>
                </nav>
            </header>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <select id="dropdown" name="dropdown">
                            <option value="User">User</option>
                            <option value="Police">Police</option>
                            <option value="Law enforcement officer">Law Enforcement Officer</option>
                        </select>
                        <input type="text"  id="signupfirstname" placeholder="First Name" />
                        <input type="text"  id="signuplastname" placeholder="Last Name" />
                        <input type="email" id="signupemail" placeholder="Email" />
                        <input type="password" id="signuppassword" placeholder="Password" />
                        <button onClick={handleSignup}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form  id= "form" action="#">
                        <h1>Sign in</h1>
                        <span>or use your account</span>
                        <input id= "email" type="email" placeholder="Email" />
                        <input id= "password" type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button onClick={handleLogin}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 id="message">Welcome Back!</h1>
                            <p id="message1">To keep connected, <br>
                            </br>please login with your info</p>
                            <button className="ghost" id="signIn" onClick={myFunction}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Start journey with us</p>
                            <button className="ghost" id="signUp" onClick={myFunction}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

function myFunction() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

function handleSignup() {
    const firstname = document.getElementById('signupfirstname').value;
    const lastname = document.getElementById('signuplastname').value;
    const password = document.getElementById('signuppassword').value;
    const email = document.getElementById('signupemail').value;
    const dropdownValue = document.getElementById("dropdown").value;

    const hashed_pwd = btoa(password)

    const url = 'http://127.0.0.1:5000/Signup';
    const requestData = {
        "firstname": firstname,
        "lastname" : lastname,
        "hashed_pwd": password,
        "type_of_user": dropdownValue,
        "email" : email
      }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData), // Convert the data to JSON format
      };
     fetch(url,requestOptions)
    .then((response) => {
        if (!response.ok) {
            alert("Retry signingup again");
            document.getElementById('signupfirstname').value ="";
            document.getElementById('signuplastname').value="";
            document.getElementById('dropdown').value = "";
            document.getElementById('signuppassword').value="";
            document.getElementById('signupemail').value="";
            throw new Error('Network response was not ok');
         }
          return response.json();
    })
    .then((data) => {
          if(data.message.includes("user signed up successfully")){
            document.getElementById("message").innerHTML = "Hurray!!!!";
            document.getElementById("message1").innerHTML = "Account created sucessfully";
            document.getElementById('signupfirstname').value ="";
            document.getElementById('signuplastname').value="";
            document.getElementById('dropdown').value = "";
            document.getElementById('signuppassword').value="";
            document.getElementById('signupemail').value="";
          }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
};

function handleLogin(){

    if (document.getElementById('email').value === ""){
        alert("Email or password should not be null");
        return false
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    const hashed_pwd = btoa(password)

    const url = 'http://127.0.0.1:5000/login';
    const requestData = {
        "username" : email,
        "hashed_pwd": hashed_pwd,
      }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData), // Convert the data to JSON format
      };
     fetch(url,requestOptions)
    .then((response) => {
        if (!response.ok) {
            alert("Invalid Password or UserName");
            document.getElementById('email').value ="";
            document.getElementById('password').value ="";
            throw new Error('Network response was not ok');
         }
          window.location.href = "./dashboard";
          return response.json();
    })
    .then((data) => {
          if(data.message.includes("username and password valid")){
            setCookie("authToken", data.token , 2);
            console.log("logined sucessfully");
          }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
};