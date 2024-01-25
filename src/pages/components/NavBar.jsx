import React from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// Components
import Authenticate from "./Authenticate";

export default function NavBar( data ) {
    return (
        <div className="NavBar">
            <h1>Task-Master</h1>
            <FontAwesomeIcon className="PenToSquare" icon={faPenToSquare} size="2x"/>
            <Authenticate data={data}/>
        </div>
    )
}