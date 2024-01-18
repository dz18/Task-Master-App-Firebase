import React, { useEffect, useState } from "react";

// Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../../firebase";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";


export default function Authenticate() {

    const navigate = useNavigate()

    // Check if user is logged in and get user details
    const [authenticatedUser, setAuthenticatedUser] = useState('')
    const [username, setUsername] = useState('')
    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) =>{
            if(user){
                // User is logged in
                setAuthenticatedUser(user)
                // Set username
                const usernameRef = ref(database, 'users/' + user.uid + '/' + 'details/username')
                onValue(usernameRef, (snapshot) => {
                    setUsername(snapshot.val())
                })
            } else {
                // User is not logged in
                setAuthenticatedUser(null)
                setUsername(null)
            }

            return () =>{
                listenAuth()
            }

        })
    })

    // Sign user out
    const userSignOut = () => {
        signOut(auth)
        .then(() =>{
            alert('User signed out')
            navigate('/')
        })
        .catch((error) =>{
            console.log('Error')
        })
    }
    
    return (
        <div className="Authenticate">
        {authenticatedUser === null ? <>
            <Link className="link" to='/'>Welcome</Link>
            <Link className="link" to='/login'>Login</Link>
            <Link className="link" to='/register'>Register</Link> 
            </> : <>
            <FontAwesomeIcon className="CircleUser" icon={faCircleUser} size="xl"/>
            <p className="username">{username}</p>
            <button onClick={userSignOut}>Logout</button>
            <button>New List</button>
        </> }
        </div>
    )
}

{/* <div className="Authenticate">
    <FontAwesomeIcon className="CircleUser" icon={faCircleUser} size="xl"/>
    <p className="username">{username}</p>
    <button>Logout</button>
    <button>New List</button>
</div> */}