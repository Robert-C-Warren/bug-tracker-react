import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './LogInPage.css'
import { userLogin } from '../api/authenticationService';
import { useNavigate } from "react-router-dom";


const LogInPage = () => {
    let navigate = useNavigate();
    const [token, setToken] = useState();
    const [login, setLogin] = useState([]);
    const [error, setError] = useState('');
    const [visiable, setVisiable] = useState(false);


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function getToken(e) {

        e.preventDefault();
        const loginCredential = { email, password }

        userLogin(loginCredential).then((response) => {
            if (response.status == 200) {
                setToken(response.data)
                if (token != null || token != undefined) {
                    localStorage.setItem("token", token.token)
                    navigate("/dashboard")
                }
            }
        })
        .catch(err => 
            setError("Email/password are incorrect"),
            setVisiable(true),
            setTimeout(function () {
                setVisiable(false);
            }, 5000))

        console.log(token)

        {/*   const fetchToken = await axios.post("http://localhost:8080/auth/login", loginCredential)
        setToken(fetchToken.data.token)
        console.log(token)
        
    */}
    }

    return (
        <>
            <div className="fullpage">
                <div className="sigin-container">
                    <h2 className="form-head">LogIn</h2>

                    <form className="siginpanel">
                        <div className="sigintextbox">
                            <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email"></input>
                        </div>
                        <div className="sigintextbox">
                            <input className="form-control" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
                        </div>
                        <button onClick={(e) => getToken(e)} className="btn btn-primary">Login</button>
                        <p className="message">Not Registered?
                            <a className="fullpage-a" href="/signup"> Create an account</a>
                        </p>
                    </form>
                    {visiable && <p className="alert alert-danger" role="alert">{error}</p>}
                </div>
            </div>
        </>
    )
}

export default LogInPage;