import '../Css/index.css';
import React,{useState} from "react";
import Footer from "../Footer";
import MainContent from "../MainContent";
import getCookie from './GetCookieJs';

export default function Home() {
    const [href, setHref] = useState('./login');

    const handleLogin = () => {
        const authToken = getCookie("authToken");
        if (authToken) {
            setHref('./dashboard');
        } else {
            setHref('./login');
        }
    }

    return (
        <div>
            <header>
                <nav>
                    <ul className="navbar">
                        <li><h1>Chicago Crime Analysis </h1></li>
                        <div id="utility">
                            <li><a href="/document">Documentation</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href={href} onClick={handleLogin}>Login</a></li>
                        </div>
                    </ul>
                </nav>
            </header>
            <MainContent />
            <Footer />
        </div>
    )
}