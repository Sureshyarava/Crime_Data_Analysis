import React from "react";
import image1 from './image1.png';

export default function MainContent(){
    return(
    <div class="content">
        <h1>Trend Analysis of Data</h1>
            <div class="image-container img">
                <img src={image1} alt="Trend slide show" style={{width:"100%"}}/>
            </div>
    </div>
    )
}