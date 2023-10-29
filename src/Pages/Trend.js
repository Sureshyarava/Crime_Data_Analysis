import React from "react";
// import chart from "../chart.png";
import '../Css/trend.css';
import Plot from "./Plot";


export default function Trend() {
    return (
        <div class="wrapper">
            <div class="sidebar">
                <a href="/dashboard"><h2 style={{marginTop:"-13%"}}>Dashboard</h2></a>
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
                <MainPage />
                <footer id="footer" style={{marginLeft:"20%"}}><p>Disclaimer</p></footer>
            </div>
        </div>
    )
}

function MainPage() {
    return (
        <div>
            <header className="trend">
                <nav>
                    <ul class="navbar-trend">
                        <li><h1>Trend</h1></li>
                    </ul>
                </nav>
            </header>


            <div class="content">
                <h1 class="element">Analysis of Trend Data</h1>
                <div class="content-container grid-container">
                    <div>
                        <label for="color">Input parameter</label>
                        <br></br>
                        <br></br>
                        <select id="color">
                            <option value="blue">Product Type</option>
                            <option value="red">1</option>
                            <option value="green">2</option>
                            <option value="yellow">3</option>
                        </select>
                        <br></br>
                        <br></br>

                        <select id="color">
                            <option value="blue">Geo Location</option>
                            <option value="red">1</option>
                            <option value="green">2</option>
                            <option value="yellow">3</option>
                        </select>

                        <br></br>
                        <br></br>
                        <select id="color">
                            <option value="blue">Timeframe</option>
                            <option value="red">1</option>
                            <option value="green">2</option>
                            <option value="yellow">3</option>
                        </select>

                        <br></br>
                        <br></br>
                        <select id="color">
                            <option value="blue">Frequency-Data Point</option>
                            <option value="red">1</option>
                            <option value="green">2</option>
                            <option value="yellow">3</option>
                        </select>
                        <br></br>
                        <br></br>
                        <button class="button">Submit</button>

                    </div>
                    {/* <img src={chart} alt="chart" /> */}
                    <Plot />
                </div>
            </div>
        </div>
    )
}