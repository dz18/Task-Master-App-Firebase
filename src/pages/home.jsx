import React from "react";
import './styling/styling.css'
import NavBar from "./components/NavBar";

export default function Home() {
    return(
        <div className="home">
            <NavBar/>
            <div className="mainContent">
                <h1>Home</h1>
            </div>
        </div>
    )
}