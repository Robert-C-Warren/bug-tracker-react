import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css'
import { Modal } from 'react-bootstrap';

const Dashboard = () => {
    const [login, setLogin] = useState({
        roles: ""
    });
    const [modal, setModal] = useState();
    const [buttonHandle, setButton] = useState();
    const [token, setToken] = useState();
    const [isLoading, setLoading] = useState(true)
    const [bugs, setBugs] = useState({
        bugId: 0,
        assignedTo: '',
        published: false,
        bugName: '',
        bugStatus: '',
        bugDesc: '',
        bugUrgency: ''
    });

    const [ID, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [asignTo, setAsignTo] = useState("");
    const [publish, setpublish] = useState(true);
    const [status, setStatus] = useState("");
    const [desc, setDesc] = useState("");
    const [urgency, setUrgency] = useState("");

    const closeModal = () => {
        setId(bugs[bugs.length - 1].bugId + 1)
        setAsignTo('')
        setDesc('')
        setTitle('')
        setStatus('')
        setUrgency('')
        handleModal()

    }


    const getUserInfo = async () => {
        let ttk = localStorage.getItem('token')
        setToken(ttk)
        console.log(token)

        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        await axios.get("http://localhost:8080/auth/userinfo", yourConfig)
            .then(response => setLogin(response.data))
        {/*    
        .catch(err => {
                if (!err.ok) {
                    setError(err.message)
                    setVisiable(true)
                    setTimeout(function () {
                        setVisiable(false);
                        setError('');
                    }, 5000)
                }
            })
        */}
        getBugs()
    }

    useEffect(() => {
        getUserInfo()
        getBugs()
        setTimeout(function () {
            getUserInfo()
            getBugs()
        }, 250)
        setTimeout(function () {
            getUserInfo()
            getBugs()
        }, 500)
        setTimeout(function () {
            getUserInfo()
            getBugs()
        }, 750)
        setLoading(false)
    }, [])

    const getBugs = async () => {

        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        await axios.get("http://localhost:8080/bugs", yourConfig)
            .then(response => setBugs(response.data))


        console.log(bugs)
    }


    const handleModal = () => {
        setModal(false)
    }

    const addEditHandle = (e) => {
        setButton(e)
        setModal(true)
    }

    const editCourse = (Id) => {
        setButton(false)
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios.get("http://localhost:8080/bugs/" + Id, yourConfig)
            .then(result => (setId(result.data.bugId),
                setTitle(result.data.bugName),
                setDesc(result.data.bugDesc),
                setAsignTo(result.data.assignedTo),
                setStatus(result.data.bugStatus),
                setUrgency(result.data.bugUrgency)))

        setModal(true)
    }

    const updateCourse = async (e) => {
        e.preventDefault();
        const bug = {
            "bugId": ID,
            "bugStatus": status,
            "bugDesc": desc,
            "assignedTo": asignTo,
            "bugName": title,
            "bugUrgency": urgency,
            "published": true
        }

        console.log(bug)
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            },

        };
        await axios.put("http://localhost:8080/bugs", bug, yourConfig)
        closeModal()
        setModal(false)
        setTimeout(function () {
            getBugs()
        }, 250)

    }

    const deleteCourse = (id) => {
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios.delete("http://localhost:8080/bug/" + id, yourConfig)
        setModal(false)
        setTimeout(function () {
            getBugs()
        }, 250)

    }

    const addbug = (e) => {
        e.preventDefault();
        const bug = {
            "bugId": ID,
            "bugStatus": status,
            "bugDesc": desc,
            "assignedTo": asignTo,
            "bugName": title,
            "bugUrgency": urgency,
            "published": false
        }
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios.post("http://localhost:8080/bug", bug, yourConfig)
        axios.get("http://localhost:8080/sendMail/" + login.email, yourConfig)

        setModal(false)
        setTimeout(function () {
            getBugs()
        }, 250)


    }

    const publishBug = async (bug) => {
        const bugP = {
            "bugId": bug.bugId,
            "bugStatus": bug.bugStatus,
            "bugDesc": bug.bugDesc,
            "assignedTo": bug.assignedTo,
            "bugName": bug.bugName,
            "bugUrgency": bug.bugUrgency,
            "published": true
        }
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            },

        };
        await axios.put("http://localhost:8080/bugs", bugP, yourConfig)
        closeModal()
        setModal(false)
        setTimeout(function () {
            getBugs()
        }, 250)
    }

    if (isLoading) {
        return (<div><h1>Loading...</h1></div>)
    }

    return (
        <>
            <div className="dashboard-fullpage">
                <nav className="navbar  navbar-dark bg-dark">
                    <h3 className="m-2 text-white">Dashboard</h3>
                    <div className="navAdd">
                        {login.roles == "admin" && <h4 className="text-white">{login.name}</h4>}
                        {login.roles == "user" && <h4 className="text-white ">{login.name}</h4>}
                        <button className="m-2 btn btn-primary" onClick={(e) => addEditHandle(e)}>Add</button>
                        <button className="m-2 btn btn-success" onClick={() => getUserInfo()}>Load</button>
                    </div>
                </nav>
                <div className="bugs-container">
                    <div className="bugs-cards">
                        <div className="container m-5 pb-5">
                            {login.roles === "user" && <h2>Road-Map</h2>}
                            {login.roles === "user" && <h4>We Are Working On</h4>}

                            {login.roles === "admin" && <h2>Un-Published</h2>}

                            {login.roles === "admin" &&
                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Asigned to</th>
                                            <th scope="col">status</th>
                                            <th scope="col">Priority</th>
                                            {login.roles === "admin" && <th></th>}
                                            {login.roles === "admin" && <th></th>}
                                            {login.roles === "admin" && <th></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(bugs) ? bugs.filter(n => n.published != true)
                                            .map((bugs) => (
                                                <tr key={bugs.bugId}>
                                                    <td>{bugs.bugId}</td>
                                                    <td >{bugs.bugName}</td>
                                                    <td >{bugs.bugDesc}</td>
                                                    <td>{bugs.assignedTo}</td>
                                                    <td >{bugs.bugStatus}</td>
                                                    <td >{bugs.bugUrgency}</td>
                                                    {login.roles == "admin" &&
                                                        <td>
                                                            <button onClick={() => editCourse(bugs.bugId)} className="btn btn-primary btn-sm">Edit</button>
                                                        </td>
                                                    }
                                                    {login.roles == "admin" &&
                                                        <td>
                                                            <button onClick={() => deleteCourse(bugs.bugId)} className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    }
                                                    {login.roles == "admin" &&
                                                        <td>
                                                            <button onClick={() => publishBug(bugs)} className="btn btn-success btn-sm">publish</button>
                                                        </td>
                                                    }
                                                </tr>
                                            )) : []}
                                    </tbody>
                                </table>
                            }

                            {login.roles === "admin" && <h2>Published</h2>}
                            <table className="table  table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Asigned to</th>
                                        <th scope="col">status</th>
                                        <th scope="col">Priority</th>
                                        {login.roles === "admin" && <th></th>}
                                        {login.roles === "admin" && <th></th>}

                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(bugs) ? bugs.filter(n => n.published === true).filter(n => n.bugStatus == "Open")
                                        .map((bugs) => (
                                            <tr key={bugs.bugId}>
                                                <td>{bugs.bugId}</td>
                                                <td >{bugs.bugName}</td>
                                                <td >{bugs.bugDesc}</td>
                                                <td>{bugs.assignedTo}</td>
                                                <td >{bugs.bugStatus}</td>
                                                <td >{bugs.bugUrgency}</td>
                                                {login.roles == "admin" &&
                                                    <td>
                                                        <button onClick={() => editCourse(bugs.bugId)} className="btn btn-primary btn-sm">Edit</button>
                                                    </td>
                                                }
                                                {login.roles == "admin" &&
                                                    <td>
                                                        <button onClick={() => deleteCourse(bugs.bugId)} className="btn btn-danger btn-sm">Delete</button>
                                                    </td>
                                                }

                                            </tr>
                                        )) : []}
                                </tbody>
                            </table>
                            {login.roles === "user" && <h4>We Finished working On</h4>}
                            {login.roles === "user" &&

                                <table className="table  table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Asigned to</th>
                                            <th scope="col">status</th>
                                            <th scope="col">Priority</th>
                                            {login.roles === "admin" && <th></th>}
                                            {login.roles === "admin" && <th></th>}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(bugs) ? bugs.filter(n => n.published === true).filter(n => n.bugStatus == "Open")
                                            .map((bugs) => (
                                                <tr key={bugs.bugId}>
                                                    <td>{bugs.bugId}</td>
                                                    <td >{bugs.bugName}</td>
                                                    <td >{bugs.bugDesc}</td>
                                                    <td>{bugs.assignedTo}</td>
                                                    <td >{bugs.bugStatus}</td>
                                                    <td >{bugs.bugUrgency}</td>
                                                    {login.roles == "admin" &&
                                                        <td>
                                                            <button onClick={() => editCourse(bugs.bugId)} className="btn btn-primary btn-sm">Edit</button>
                                                        </td>
                                                    }
                                                    {login.roles == "admin" &&
                                                        <td>
                                                            <button onClick={() => deleteCourse(bugs.bugId)} className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    }

                                                </tr>
                                            )) : []}
                                    </tbody>
                                </table>
                            }
                            {login.roles === "admin" && <h2>Closed</h2>}
                            {login.roles === "admin" &&
                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Asigned to</th>
                                            <th scope="col">status</th>
                                            {login.roles === "admin" && <th></th>}
                                            {login.roles === "admin" && <th></th>}
                                            {login.roles === "admin" && <th></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(bugs) ? bugs.filter(n => n.published == true).filter(n => n.bugStatus == "Close")
                                            .map((bugs) => (
                                                <tr key={bugs.bugId}>
                                                    <td>{bugs.bugId}</td>
                                                    <td >{bugs.bugName}</td>
                                                    <td >{bugs.bugDesc}</td>
                                                    <td>{bugs.assignedTo}</td>
                                                    <td >{bugs.bugStatus}</td>
                                                    <td >{bugs.bugUrgency}</td>
                                                    {login.roles == "admin" &&
                                                        <td>
                                                            <button onClick={() => editCourse(bugs.bugId)} className="btn btn-primary btn-sm">Edit</button>
                                                        </td>
                                                    }
                                                    {login.roles == "admin" &&
                                                        <td>
                                                            <button onClick={() => deleteCourse(bugs.bugId)} className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    }
                                                   
                                                </tr>
                                            )) : []}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
                <Modal show={modal} onHide={() => handleModal(false)}>
                    <Modal.Body>
                        <div className="input-group mb-3 justify-content-center ">
                            <input className="input-group-text " disabled={true} value={"ID: " + ID}></input>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-group-text" placeholder="Title"></input>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <input value={desc} onChange={(e) => setDesc(e.target.value)} className="input-group-text" placeholder="Description"></input>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <select value={asignTo} onChange={(e) => setAsignTo(e.target.value)} id="state" className="input-group-text">
                                <option>Ali Kachef </option>
                                <option>Robert Warren </option>
                            </select>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <select value={status} onChange={(e) => setStatus(e.target.value)} id="state" className="input-group-text">
                                <option>Open</option>
                                <option>Close</option>
                            </select>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <select value={urgency} onChange={(e) => setUrgency(e.target.value)} id="state" className="input-group-text">
                                <option>Urgent</option>
                                <option>Top</option>
                                <option>Modrate</option>
                                <option>low</option>
                            </select>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button disabled={!buttonHandle} className="btn btn-success" onClick={(e) => addbug(e)} >Add</button>
                        <button disabled={buttonHandle} className="btn btn-primary" onClick={(e) => updateCourse(e)}>Update</button>
                        <button className="btn btn-danger" onClick={() => closeModal()} >close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Dashboard