import '../Css/index.css';
import React from "react";
import Footer from "../Footer";
import handleLogout from './HandleLogoutJs';
import MainAbout from './MainAbout';


export default function About() {

    return (
        <div>
            <header>
                <nav>
                    <ul className="navbar">
                        <li><h1>Crime Data Analysis</h1></li>
                        <div id="utility">
                            
                            <li><a href="/document">Document</a></li>
                            <li><a href= "/login" onClick={handleLogout}>Logout</a></li>
                        </div>
                    </ul>
                </nav>
            </header>
            <div>
            <MainAbout />
            </div>
            <Footer />
        </div>
    )
} 