import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, database } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import './styling/styling.css'
import NavBar from './components/NavBar'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate('')

    const handleRegister = (e) => {
        e.preventDefault()
        // Validate Inputs
        if(validateEmail(email) == false || validatePassword(password, confirmPassword) == false) {
            alert('Email or Password are outta line!!')
            return
        }
        if(validateFields(username) == false || validateFields(confirmPassword) == false) {
            alert('Input fields are empty!!')
            return
        }

        // Register User
        createUserWithEmailAndPassword(auth, email, password)
        .then((UserCredential) => {
            console.log(UserCredential)
            //Create User Data in RT-Database
            var user = auth.currentUser
            var userdata = {
                details: {
                    email: email,
                    username: username,
                },
                data: {
                    "To Do": {
                        "Task 1": false,
                        "Task 2": true,
                    }
                }
            }; 
            
            set(ref(database, 'users/' + user.uid), userdata)
            navigate('/login')
            alert('Account Created!!' + '\nUsername: ' + username + '\nEmail: ' + email)

        })
        .catch((error) => {
            console.log(error)
            alert(error)
        })
    }

    function validateEmail(email) {
        var expression = /^[^@]+@\w+(\.\w+)+\w$/
        if(expression.test(email) === true){
            // Email is good
            return true
        } else {
            // Email is bad
            return false
        }
    }

    function validatePassword(password, confirmPassword) {
        if(password.length < 6) {
            return false
        } 
        
        if(password === confirmPassword){
            return true
        } else {
            return false
        }
    }

    function validateFields(field) {
        if(field == null) {
            return false
        }

        if(field.length <= 0) {
            return false
        } else {
            return true
        }
    }

    return(
        <div className="register">
            <NavBar/>
            <div className="mainContent">
                <form className="container" onSubmit={handleRegister}>
                    <section className='text'>
                        <h1 className="header">Task-Master App + Firebase</h1>
                        <p className="returningText">Returning User? <span><Link to="/login" className="link">Login</Link></span></p>
                    </section>
                    <section className='form'>
                        <h2>Register</h2>
                        <label for='username'>Username</label>
                        <input id='username' type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                        <label for='email'>Email</label>
                        <input id='email' type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <label for='password'>Password</label>
                        <input id='password' type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        <label for="confirmPassword">Confirm Password</label>
                        <input id='confirmPassword' type="password" value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <div className="button"><button type='submit'>Login</button></div>
                    </section> 
                </form>
            </div>
        </div>
    )
}