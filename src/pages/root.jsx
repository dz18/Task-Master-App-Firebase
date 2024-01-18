import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './styling/styling.css'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Root() {
    // Confirm user is signed out
    useEffect(() => {
        signOut(auth)
        .then(() => {
            //...
        })
        .catch((error) => {
            alert(error)
        })
    })

    return(
        <div className="root">
            <h1>Welcome to Task-Master App + Firebase</h1>
            <h3>Created by Dylan Zuniga @ CSUF</h3>
            <div className="button-containers">
                <Link to='/login' >
                    <button>Login</button>
                </Link>
                <Link to='/register'>
                    <button>Register</button>
                </Link>  
            </div>
        </div>
    )
}