import React, { useState } from "react";
import './signInUp.scss'

function checkLS() {
    return localStorage.getItem('storageUsers') ? JSON.parse(localStorage.getItem('storageUsers')) : []
}

export default function SignInUp({setUser, signIn, signUp, setSignIn, setSignUp,setUserLoggedIn}) {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [email,setEmail] = useState('')
    const [userName,setUserName] = useState('')
    const [userPassword,setUserPassword] = useState('')
    const storageUsers = checkLS()

    function signUpFunc() {
        if(name.length < 3) {
            alertFunc(setName,'name need at least 3 letters!','name')
        } else if(surname.length < 3) {
            alertFunc(setSurname,'surname need at least 3 letters!','surname')
        } else if(password.length < 6) {
            alertFunc(setPassword,'password need at least 6 letters!','password')
        } else if(confirmPassword.length < 6) {
            alertFunc(setConfirmPassword,'confirm password need at least 6 letters!','confirmpassword')
        } else if(confirmPassword !== password) {
            alertFunc(setConfirmPassword, 'passwords did not match!', 'confirmpassword')
        } else if(email.length < 5) {
            alertFunc(setEmail, 'email need at least 5 letters!', 'email')
        } else if(!email.includes('@')) {
            alertFunc(setEmail, 'email need character "@"!','email')
        } else if(storageUsers.find(user => user.password === password)) {
            alertFunc(setPassword, 'already exist user with this password!', 'password')
        } else {
            const createdUser = {
                name: name,
                surname: surname,
                password: password,
                confirmpassword: confirmPassword,
                email: email,
                cart: []
            }
            const updatedUsers = [...storageUsers,createdUser]
            localStorage.setItem('storageUsers',JSON.stringify(updatedUsers))
            setName('')
            setSurname('')
            setPassword('')
            setConfirmPassword('')
            setEmail('')
            setSignUp(false)
        }
    }

    function signInFunc() {
        console.log(storageUsers)
        if(!storageUsers.find(user => user.name === userName)) {
            setUserName('')
            setUserPassword('')
            alertFunc(setUserName,'no user with this name!','username')
        } else if(!storageUsers.find(user => user.password === userPassword)){
            setUserName('')
            setUserPassword('')
            alertFunc(setUserPassword,'no user with this password!','userpassword')
        } else {
            const user = storageUsers.find(user => user.name === userName && user.password === userPassword)
            console.log(storageUsers)
            const test = JSON.parse(localStorage.getItem('storageUsers'))
            console.log(test)
            console.log(user)
            setUser(user)
            setSignIn(false)
            setUserLoggedIn(true)
            setUserName('')
            setUserPassword('')
        }
    }

    function alertFunc(fun,text,id) {
        const element = document.getElementById(id)
        if(element.id === 'password' || 
        element.id === 'userpassword' || 
        element.id === 'confirmpassword') {
            element.type = 'text'
            setTimeout(() => {
                element.type = 'password'
            },1500);
        }
        element.style.color = 'red'
        element.disabled = true
        fun(text)
        setTimeout(() => {
            element.style.color = 'black'
            element.disabled = false
            fun('')
        },1500);
    }

    if(signIn) {
        return (
            <div className="signInUp__cont">
                <div className="inner__cont">
                    <h3>Sign In</h3>
                    <div className="inputs__cont">
                        <div>
                            <label htmlFor="username">Name</label>
                            <input id="username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="userpassword">Password</label>
                            <input id="userpassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="buttons__cont">
                        <button onClick={signInFunc}>Sign in</button>
                        <button onClick={() => setSignIn(false)}>Back</button>
                    </div>
                </div>
            </div>
        )
    } else if(signUp) {
        return (
            <div className="signInUp__cont">
            <div className="inner__cont">
                <h3>Sign Up</h3>
                <div className="inputs__cont">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input id="surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="confirmpassword">Confirm password</label>
                        <input id="confirmpassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="buttons__cont">
                    <button onClick={signUpFunc}>Sign Up</button>
                    <button onClick={() => setSignUp(false)}>Back</button>
                </div>
            </div>
        </div>
        )
    } else {
        return null
    }
}