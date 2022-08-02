import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './LogInPage.css'
import ImageUploading from 'react-images-uploading';
import axios from 'axios';


function SignUpOPage() {
    const [success, setSuccess] = useState();
    const [sucessIsVisable, setSuccessIsVisable] = useState(false);
    const [error, setError] = useState('');
    const [visiable, setVisiable] = useState(false);
    const [load, setLoad] = useState(false);

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [role] = useState("admin");

    const [organizationName, setOrganisationName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [organizationDescription, setOrganisationDescription] = useState();
    const [bugs, setBugs] = useState();


    const getToken = async (e) => {
        e.preventDefault();
        const loginCredential = { email, name, password, role }

        if (email === undefined || name === undefined || password === undefined) {
            console.log("true")
            setError("All feild are required")
            setVisiable(true)
            setTimeout(function () {
                setVisiable(false);
            }, 5000)
        }
        else if (email !== null && !email.includes("@")) {
            console.log("true")
            setError("please enter a valid email")
            setVisiable(true)
            setTimeout(function () {
                setVisiable(false);
            }, 5000)
        }
        else if (password.length < 8) {
            setError("password must be at least 8 charachters")
            setVisiable(true)

            setTimeout(function () {
                setVisiable(false);
            }, 5000)
        }
        else {
            await axios.get("http://localhost:8080/successSignUp/" + email)

            const organization = {
                "organizationName": organizationName,
                "organizationDescription": organizationDescription,
                "data": imageUrl
            }
            let yourConfig = {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
            await axios.post("http://localhost:8080/organ", organization, yourConfig)
                .then(response => {
                    setSuccess(response)
                    setSuccessIsVisable(true)
                    setLoad(true)
                })

            await axios.post("http://localhost:8080/userregister", loginCredential)
                .then((response) => {
                    if (!response.ok) {
                        setSuccess("User Created Sucessfly")
                        setSuccessIsVisable(true)
                        setEmail("")
                        setName("")
                        setPassword("")
                        setTimeout(function () {
                            setSuccessIsVisable(false);
                        }, 5000)
                    }

                })

            console.log(readFiledataAsLob)
        }

    }

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await readFiledataAsLob(file)
        setImageUrl(base64)
    }
    const readFiledataAsLob = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (err) => {
                reject(err);
            };
            reader.readAsDataURL(file)
        })
    }

    const loadButton = () => {
        if (load) {
            return "spinner-border text-primary";
        }
        else {
            return "btn btn-primary";
        }
    }


    return (
        <>
            <div className="Ofullpage">
                <div className="sigin-container">
                    <h2 className="form-head">Organization SignUp</h2>
                    <div className="regesteriation">
                        <div className="siginpanel">
                            <div class="mb-3">
                            <label className="p-2">Buisness Image</label>
                                <input onChange={(e) => uploadImage(e)} class="form-control form-control-sm" id="formFileSm" type="file" />
                            </div>
                            <label className="p-2">Buisness Information</label>
                            <div className="sigintextbox">
                                <input className="form-control" onChange={(e) => setOrganisationName(e.target.value)} type="text" placeholder="Buisness Name"></input>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" onChange={(e) => setOrganisationDescription(e.target.value)} id="exampleFormControlTextarea1" placeholder="Company Discription..." rows="3"></textarea>
                            </div>
                        </div>
                        <form className="siginpanel">
                            <label className="p-2">Create Login Information</label>
                            <div className="sigintextbox">
                                <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
                            </div>
                            <div className="sigintextbox">
                                <input className="form-control" onChange={(e) => setName(e.target.value)} type="text" placeholder="Name"></input>
                            </div>
                            <div className="sigintextbox">
                                <input className="form-control" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
                            </div>
                        </form>
                    </div>
                    <button disabled={load} onClick={(e) => {
                        setLoad(true);
                        getToken(e).then(() => setLoad(false))
                    }} herf="/login" className={load ? "spinner-grow text-primary" : "btn btn-primary"}>{load ? "" : "SignUp"}</button>
                    <p className="message">Registered?
                        <a className="fullpage-a" href="/login"> Login</a>
                    </p>
                    {sucessIsVisable && <p className="alert alert-success" role="alert">{success}</p>}

                    {visiable && <p className="alert alert-danger" role="alert">{error}</p>}

                </div>

            </div>
        </>
    )
}

export default SignUpOPage;