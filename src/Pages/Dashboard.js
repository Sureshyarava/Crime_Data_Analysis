import React from "react";
import '../Css/dashboard.css';
import Footer from "../Footer";
export default function Dashboard() {
    return (
        <div class="wrapper">
            <div class="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li><a href="/trend">Trend 1</a></li>
                    <li><a href="/trend">Trend 2</a></li>
                    <li><a href="/trend">Trend 3</a></li>
                    <li><a href="/trend">Trend 4</a></li>
                    <li><a href="/trend">Trend 5</a></li>
                    <li><a href="/trend">Trend 6</a></li>
                </ul>
                <div class="social_media">
                    <a href="\">Logout</a>

                </div>
            </div>
            <div class="main_content">
                <div class="header">Hi Dear !!!</div>
                <div class="info">
                    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
                    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>

                </div>
            </div>
        </div>
    )
}