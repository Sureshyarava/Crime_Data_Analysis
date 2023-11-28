import '../Css/index.css';
import React from "react";
import Footer from "../Footer";
import handleLogout from './HandleLogoutJs';
import MainDocument from './MainDocument';


export default function Document() {

    return (
        <div>
            <header>
                <nav>
                    <ul className="navbar">
                        <li ><a href="/dashboard">Chicago Crime Analysis</a></li>
                        <div id="utility">
                            
                            <li><a href="/about">About</a></li>
                            <li><a href= "/login" onClick={handleLogout}>Logout</a></li>
                        </div>
                    </ul>
                </nav>
            </header>
            <div>
            <MainDocument />
            </div>
            <Footer />
        </div>
    )
} 