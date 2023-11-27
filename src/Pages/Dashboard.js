import React,{useState} from "react";
import '../Css/dashboard.css';
import image1 from '../image1.png';
import getCookie from "./GetCookieJs";
import handleLogout from "./HandleLogoutJs";
export default function Dashboard() {
    const [href, setHref] = useState('#');

  const handleLinkClick = (path) => {
    const authToken = getCookie("authToken");
    if (authToken) {
        setHref(path);
    } else {
        setHref('./login');
    }
}
    return (
        <div className="wrapper">
            <div className="sidebar">
                <h2 style={{ marginTop: "-13%" }}>Dashboard</h2>
                <ul>
                    <li><a href={href} onClick={() => handleLinkClick("/trend1")}>Trend 1</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend2")}>Trend 2</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend3")}>Trend 3</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend4")}>Trend 4</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend5")}>Trend 5</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend6")}>Trend 6</a></li>
                </ul>
                <div className="social_media">
                    <a onClick={handleLogout} href="./login">Logout</a>
                </div>
            </div>
            <div className="main_content">
                <header className="trend">
                    <nav>
                        <ul className="navbar-trend">
                            <div id="utilities" style={{ marginLeft: "70%" }}>
                                <li><a href="/document">Documentation</a></li>
                                <li><a href="/about">About</a></li>
                            </div>
                        </ul>
                    </nav>
                </header>
                <div className="image-container img">
                    <img src={image1} alt="Trend slide show" style={{ width: "100%", marginTop: "10%" }} />
                </div>
                <footer id="footer" style={{ marginLeft: "20%" }}>
                    <p>Disclaimer: This project, "Crime Data Analysis for Safer Communities," is intended for informational and educational purposes only. The analysis and trends presented in this report are based on publicly available crime data and are subject to the limitations and accuracy of the data sources.</p>
        </footer>
            </div>
        </div>
    )
}
