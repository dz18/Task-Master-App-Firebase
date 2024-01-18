import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { app, auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import './styling/styling.css'
import NavBar from "./components/NavBar";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate('')

    const handleLogin = (e) => {
        e.preventDefault()
        // Validate Inputs
        if(validateEmail(email) == false || validatePassword(password) == false) {
            alert('Email or Password is Outta Line!!')
            return
        }
        
        // Login
        signInWithEmailAndPassword(auth, email, password)
        .then((UserCredential) => {
            console.log(UserCredential)
            navigate('/home')
        })
        .catch((error) => {
            alert(error)
        })

    }

    function validateEmail(email) {
        var expression = /^[^@]+@\w+(\.\w+)+\w$/
        if(expression.test(email) == true){
            // Email is good
            return true
        } else {
            // Email is bad
            return false
        }
    }

    function validatePassword(password) {
        if(password.length < 6) {
            return false
        } else {
            return true
        }
    }


    return(
        <div className="login">
            <NavBar/>
            <div className="mainContent">
                <form className="container" onSubmit={handleLogin}>
                    <section className="text">
                        <h1 className="header">Task-Master App + Firebase</h1>
                        <p className="newUser">New User? <span><Link to="/register" className="link">Create an Account</Link></span></p>
                    </section>
                    <section className="form">
                        <h2>Login</h2>
                        <label for='email'>Email</label>
                        <input id='email' value={email} type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <label for='username'>Password</label>
                        <input id='password' value={password} type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    </section>
                    <div className="button"><button type='submit'>Login</button></div>
                </form>
            </div>
        </div>
    )
}