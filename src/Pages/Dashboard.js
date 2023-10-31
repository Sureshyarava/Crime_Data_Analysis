import React from "react";
import '../Css/dashboard.css';
import image1 from '../image1.png';
export default function Dashboard() {
    return (
        <div class="wrapper">
            <div class="sidebar">
                <h2 style={{ marginTop: "-13%" }}>Dashboard</h2>
                <ul>
                    <li><a href="/trend1">Trend 1</a></li>
                    <li><a href="/trend2">Trend 2</a></li>
                    <li><a href="/trend3">Trend 3</a></li>
                    <li><a href="/trend4">Trend 4</a></li>
                    <li><a href="/trend5">Trend 5</a></li>
                    <li><a href="/trend6">Trend 6</a></li>
                </ul>
                <div class="social_media">
                    <a href="\">Logout</a>
                </div>
            </div>
            <div class="main_content">
                <header className="trend">
                    <nav>
                        <ul class="navbar-trend">
                            <div id="utilities" style={{ marginLeft: "70%" }}>
                                <li><a href="/documentation">Documentation</a></li>
                                <li><a href="/about">About</a></li>
                            </div>
                        </ul>
                    </nav>
                </header>
                <div class="image-container img">
                    <img src={image1} alt="Trend slide show" style={{ width: "100%" , marginTop:"10%"}} />
                </div>
                <footer id="footer" style={{ marginLeft: "20%" }}><p>Disclaimer</p></footer>
            </div>
        </div>
    )
}