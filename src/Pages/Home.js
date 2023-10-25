import '../Css/index.css';
import React from "react";
import Footer from "../Footer";
import MainContent from "../MainContent";

export default function Home() {
    return (
        <div>
            <header>
                <nav>
                    <ul class="navbar">
                        <li><h1>Analytics</h1></li>
                        <li><a href="/documentation">Documentation</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            </header>
            <MainContent />
            <Footer />
        </div>
    )
}