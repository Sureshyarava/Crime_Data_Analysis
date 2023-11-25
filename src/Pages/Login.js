import React from "react";
import '../Css/login.css';
import Footer from "../Footer";

export default function Login() {
    return (
        <div className="login">
            <header className="header-login">
                <nav>
                    <ul class="navbar-login">
                        <li><h2>Analytics Sign in/up </h2></li>
                        <div id="utility">
                        <li><a href="/">Home</a></li>
                        <li><a href="/documentation">Documentation</a></li>
                        <li><a href="/about">About</a></li>
                        </div>
                    </ul>
                </nav>
            </header>
            <div class="container" id="container">
                <div class="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input type="text"  id="signupname" placeholder="Name" />
                        <input type="email" id="signupemail" placeholder="Email" />
                        <input type="password" id="signuppassword" placeholder="Password" />
                        <button onClick={handleSignup}>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action=".\dashboard">
                        <h1>Sign in</h1>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1 id="message">Welcome Back!</h1>
                            <p id="message1">To keep connected, <br>
                            </br>please login with your info</p>
                            <button class="ghost" id="signIn" onClick={myFunction}>Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Start journey with us</p>
                            <button class="ghost" id="signUp" onClick={myFunction}>Sign Up</button>
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
    const name = document.getElementById('signupname').value;
    const password = document.getElementById('signuppassword').value;
    const email = document.getElementById('signupemail').value;

    const url = 'http://127.0.0.1:5000/signup';
    const requestData = {
        "username": name,
        "hashed_pwd": password,
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
         throw new Error('Network response was not ok');
         }
          return response.json();
    })
    .then((data) => {
          if(data.message.includes("user signed up successfully")){
            document.getElementById("message").innerHTML = "Hurray!!!!";
            document.getElementById("message1").innerHTML = "Account created sucessfully";
            document.getElementById('signupname').value ="";
            document.getElementById('signuppassword').value="";
            document.getElementById('signupemail').value="";
          }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
};