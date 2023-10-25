import React from "react";
import chart from "../chart.png";
import '../Css/trend.css';

export default function Trend() {
    return (
        <div>
            <header className="trend">
                <nav>
                    <ul class="navbar-trend">
                        <li><a href="./dashboard">Dashboard</a></li>
                        <li><h1>Trend </h1></li>
                        <li><a href="/">Logout</a></li>
                    </ul>
                </nav>
            </header>


            <div class="content">
                <h1>Analysis of Trend Data</h1>
                <div class="content-container">
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
                    <img src={chart} alt="hello" />
                </div>
            </div>
        </div>
    )
}