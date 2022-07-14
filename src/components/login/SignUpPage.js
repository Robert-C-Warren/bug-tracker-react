import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './LogInPage.css'
import axios from 'axios';


function SignUpPage() {
    const [success, setSuccess] = useState();
    const [sucessIsVisable, setSuccessIsVisable] = useState(false);
    const [error, setError] = useState('');
    const [visiable, setVisiable] = useState(false);


    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [role] = useState("user");

    const getToken = (e) => {
        e.preventDefault();
        const loginCredential = { email, name, password, role }

        if (email === undefined || name === undefined || password === undefined ) {
            console.log("true")
            setError("All feild are required")
            setVisiable(true)
            setTimeout(function () {
                setVisiable(false);
            }, 5000)
        }
        else if(email !== null && !email.includes("@")){
            console.log("true")
            setError("please enter a valid email")
            setVisiable(true)
            setTimeout(function () {
                setVisiable(false);
            }, 5000)
        }
        else if( password.length < 8){
            setError("password must be at least 8 charachters")
            setVisiable(true)
            setTimeout(function () {
                setVisiable(false);
            }, 5000)
        }
        else {
            axios.post("http://localhost:8080/userregister", loginCredential)
                .then((response) => {
                    if (!response.ok) {
                        setSuccess("User Created Sucessfly")
                        setSuccessIsVisable(true)
                        setTimeout(function () {
                            setSuccessIsVisable(false);
                        }, 5000)
                    }

                })
        }
        {/*  .catch(err => 
            setError("User sigup failed"),
            setVisiable(true),
            setTimeout(function () {
                setVisiable(false);
            }, 5000)
        )*/}


    }

    return (
        <>
            <div className="fullpage">
                <div className="sigin-container">
                    <h2 className="form-head">SignUp</h2>
                    <form className="siginpanel">
                        <div className="sigintextbox">
                            <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>

                        </div>
                        <div className="sigintextbox">
                            <input className="form-control" onChange={(e) => setName(e.target.value)} type="text" placeholder="Name"></input>
                        </div>
                        <div className="sigintextbox">
                            <input className="form-control" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
                        </div>
                        <button onClick={(e) => getToken(e)} herf="/login" className="btn btn-primary">SignUp</button>
                        <p className="message">Registered?
                            <a className="fullpage-a" href="/login"> Login</a>
                        </p>
                    </form>
                    {sucessIsVisable && <p className="alert alert-success" role="alert">{success}</p>}

                    {visiable && <p className="alert alert-danger" role="alert">{error}</p>}

                </div>

            </div>
        </>
    )
}

export default SignUpPage;