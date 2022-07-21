import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css'
import { Modal } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BsFillBugFill } from 'react-icons/bs';
import { TbBugOff } from 'react-icons/tb';
import { getToken } from '../api/authenticationService'
import { MdDeleteForever } from "react-icons/md"
import icon from '../../components/icon-bug-15.jpg'

const Dashboard = () => {
    const [login, setLogin] = useState({
        roles: ""
    });
    const [modal, setModal] = useState();
    const [modalUser, setModalUser] = useState(false);
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
    const [status, setStatus] = useState("");
    const [desc, setDesc] = useState("");
    const [urgency, setUrgency] = useState("Urgent");
    const [users, setUsers] = useState();
    const [comments, setComments] = useState();

    const [IDuser, setIDuser] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();

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
        setToken(getToken())

        let yourConfig = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }

        await axios.get("http://localhost:8080/auth/userinfo", yourConfig)
            .then(response => setLogin(response.data))

        getBugs()
    }

    const getAllUsers = async () => {
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        await axios.get('http://localhost:8080/users', yourConfig)
            .then(response => setUsers(response.data))


    }

    const getSetToken = () => {

        let ttk = localStorage.getItem('token')
        setToken(ttk)
        getUserInfo();
    }

    useEffect(() => {
        getSetToken();
        getAllUsers();

        setTimeout(function () {
            getUserInfo()
        }, 5000)
        setLoading(false)
        console.log(users);
    }, [])

    const logout = () => {
        localStorage.clear();
        window.location.href = '/'
    }

    const getBugs = async () => {

        let yourConfig = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        await axios.get("http://localhost:8080/bugs", yourConfig)
            .then(response => setBugs(response.data))
        console.log(getToken())
        console.log(bugs);
    }


    const handleModal = () => {
        setModal(false)
    }

    const handleModalUser = () => {
        setModalUser(!modalUser)
    }

    const addEditHandle = (e) => {
        setButton(e)
        setModal(true)
    }


    const switchView = () => {
        window.location.href = '/userview'
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
    const editUser = (Id) => {
        setButton(false)
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios.get("http://localhost:8080/user/" + Id, yourConfig)
            .then(result => (setIDuser(result.data.userId),
                setName(result.data.name),
                setEmail(result.data.email),
                setRole(result.data.role)))

        setModalUser(true);
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

    const updateUser = async (e) => {
        e.preventDefault();
        const user = {
            "userId": IDuser,
            "name": name,
            "email": email,
            "role": role
        }

        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            },

        };
        await axios.put("http://localhost:8080/users", user, yourConfig)
        handleModalUser()

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

    const deleteUser = (id) => {
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios.delete("http://localhost:8080/user/" + id, yourConfig)
        setModalUser(false)
        setTimeout(function () {
            getAllUsers()
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

    const renderSwitch = (param) => {
        switch (param) {
            case "Open":
                return "badge badge-success bg-danger";
                break;
            case "Close":
                return "badge badge-success bg-success";
                break;
            case "Urgent":
                return "badge badge-success bg-danger"
                break;
            case "Top":
                return "badge badge-success bg-warning"
                break;
            case "Modrate":
                return "badge badge-success bg-info"
                break;
            case "low":
                return "badge badge-success bg-success"
                break;
            default:
                return "badge badge-success bg-secondary"
        }
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

    const postComent = async (id) => {
        const comment = {
            "text": comments,
            "postedBy": login.name
        }

        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            },
        };

        await axios.post("http://localhost:8080/comment/" + id, comment, yourConfig)
        setTimeout(function () {
            getBugs()
        }, 250)
    }

    const deleteComment = async (bid, id) => {
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + token
            },
        };

        await axios.delete("http://localhost:8080/comment/delete/" + bid + "/" + id, yourConfig)
        setTimeout(function () {
            getBugs()
        }, 250)
    }

    if (isLoading) {
        return (<div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>)
    }

    return (
        <>
            <div className="dashboard-fullpage">
                <nav className="navbar  navbar-dark bg-dark">
                    <div className="dash">
                        < img className="imageIcon" src={icon} />
                        <h3 className="m-2 text-white">Dashboard</h3>
                    </div>
                    <div className="navAdd">
                        <h4 className="text-white">{login.name}</h4>
                        <button className="m-2 btn btn-primary" onClick={(e) => addEditHandle(e)}>Add</button>
                        {/* Button to switch to user view */}
                        {login.roles === "admin" &&
                            <table className="switchView-table" align="center">
                                <button className="m-2 btn btn-light" onClick={() => switchView()}>User View</button>
                            </table>
                        }
                        <button className="m-2 btn btn-outline-light" onClick={() => logout()}>Logout</button>
                    </div>
                </nav>
                <div className="bugs-container">
                    <div className="bugs-cards">
                        <div className="container m-5 pb-5">
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
                                        {Array.isArray(bugs) ? bugs.filter(n => n.published !== true)
                                            .map((bugs) => (
                                                <tr key={bugs.bugId}>
                                                    <td>{bugs.bugId}</td>
                                                    <td >{bugs.bugName}</td>
                                                    <td >{bugs.bugDesc}</td>
                                                    <td>{bugs.assignedTo}</td>
                                                    <td >{bugs.bugStatus}</td>
                                                    <td >{bugs.bugUrgency}</td>
                                                    {login.roles === "admin" &&
                                                        <td>
                                                            <button onClick={() => editCourse(bugs.bugId)} className="btn btn-primary btn-sm">Edit</button>
                                                        </td>
                                                    }
                                                    {login.roles === "admin" &&
                                                        <td>
                                                            <button onClick={() => deleteCourse(bugs.bugId)} className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    }
                                                    {login.roles === "admin" &&
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
                            {login.roles === "admin" &&
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
                                        {Array.isArray(bugs) ? bugs.filter(n => n.published === true).filter(n => n.bugStatus === "Open")
                                            .map((bugs) => (
                                                <tr key={bugs.bugId}>
                                                    <td>{bugs.bugId}</td>
                                                    <td >{bugs.bugName}</td>
                                                    <td >{bugs.bugDesc}</td>
                                                    <td>{bugs.assignedTo}</td>
                                                    <td >{bugs.bugStatus}</td>
                                                    <td >{bugs.bugUrgency}</td>
                                                    {login.roles === "admin" &&
                                                        <td>
                                                            <button onClick={() => editCourse(bugs.bugId)} className="btn btn-primary btn-sm">Edit</button>
                                                        </td>
                                                    }
                                                    {login.roles === "admin" &&
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
                                        {Array.isArray(bugs) ? bugs.filter(n => n.published === true).filter(n => n.bugStatus === "Close")
                                            .map((bugs) => (
                                                <tr key={bugs.bugId}>
                                                    <td>{bugs.bugId}</td>
                                                    <td >{bugs.bugName}</td>
                                                    <td >{bugs.bugDesc}</td>
                                                    <td>{bugs.assignedTo}</td>
                                                    <td >{bugs.bugStatus}</td>
                                                    <td >{bugs.bugUrgency}</td>
                                                    {login.roles === "admin" &&
                                                        <td>
                                                            <button onClick={() => editCourse(bugs.bugId)} className="btn btn-primary btn-sm">Edit</button>
                                                        </td>
                                                    }
                                                    {login.roles === "admin" &&
                                                        <td>
                                                            <button onClick={() => deleteCourse(bugs.bugId)} className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    }

                                                </tr>
                                            )) : []}
                                    </tbody>
                                </table>
                            }

                            {login.roles === "admin" && <h2>User List</h2>}
                            {login.roles === "admin" &&
                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Role</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(users) ? users.map((user) => (
                                            <tr key={user.userId}>
                                                <td>{user.userId}</td>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <button onClick={() => editUser(user.userId)} className="btn btn-primary btn-sm">Edit</button>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteUser(user.userId)} className="btn btn-danger btn-sm">Delete</button>
                                                </td>
                                            </tr>
                                        )) : []}
                                    </tbody>
                                </table>}
                            {login.roles === "user" && <h2 className="road-map">Road-Map</h2>}
                        </div>

                    </div>
                </div>

                {login.roles === "user" &&
                    <VerticalTimeline>
                        {Array.isArray(bugs) ? bugs.filter(n => n.published === true).filter(n => n.bugStatus === "Open")
                            .map((bugs) => (
                                <VerticalTimelineElement className="vertical-timeline-element--work" date={bugs.bugId} iconStyle={{ background: 'red', color: '#fff' }} icon={<BsFillBugFill />} >
                                    <div className="vCard">
                                        <h6>Status: <span className={renderSwitch(bugs.bugStatus)} >{bugs.bugStatus}</span></h6>
                                        <h3 className="vertical-timeline-element-title">{bugs.bugName}</h3>
                                        <h5 className="vertical-timeline-element-subtitle">Assigned To: {bugs.assignedTo}</h5>
                                        <p>{bugs.bugDesc}</p>
                                        <p>Priority: <span className={renderSwitch(bugs.bugUrgency)} >{bugs.bugUrgency}</span></p>
                                        {Array.isArray(bugs.bugComments) ? bugs.bugComments.map((bugsC) => (
                                            <div className="commentContainer">
                                                <div className="commentSection">
                                                    <div className="comment mt-4 text-justify float-left">
                                                        <span className="commentp">{bugsC.postedBy}</span>
                                                        <span>{"- " + bugsC.postedAt[1] + "/" + bugsC.postedAt[2] + "/" + bugsC.postedAt[0]}</span>
                                                        <span>{login.roles === "admin" && <button onClick={() => deleteComment(bugs.bugId, bugsC.id)} className="btn  btn-danger btn-sm commentButton">{<MdDeleteForever />}</button>}</span>
                                                        <br />
                                                        <div className="commentd"><span >{bugsC.text} </span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : []}
                                    </div>
                                    <div className="cardComment">
                                        <div class="input-group mb-3">
                                            <input type="textbox" className="form-control" placeholder="Enter your comment" onChange={(e) => setComments(e.target.value)} />
                                            <div className="input-group-append">
                                                <button onClick={() => postComent(bugs.bugId)} className="btn btn-success" type="button">Post</button>
                                            </div>
                                        </div>
                                    </div>
                                </VerticalTimelineElement>
                            )) : []}
                        {Array.isArray(bugs) ? bugs.filter(n => n.published === true).filter(n => n.bugStatus === "Close")
                            .map((bugs) => (
                                <VerticalTimelineElement className="vertical-timeline-element--work" date={bugs.bugId} iconStyle={{ background: 'green', color: '#fff' }} icon={<TbBugOff />} >
                                    <div className="vCard">
                                        <h6>Status: <span className={renderSwitch(bugs.bugStatus)} >{bugs.bugStatus}</span></h6>
                                        <h3 className="vertical-timeline-element-title">{bugs.bugName}</h3>
                                        <h5 className="vertical-timeline-element-subtitle">Assigned To: {bugs.assignedTo}</h5>
                                        <p>{bugs.bugDesc}</p>
                                        <p>Priority: <span className={renderSwitch(bugs.bugUrgency)} >{bugs.bugUrgency}</span></p>
                                        {Array.isArray(bugs.bugComments) ? bugs.bugComments.map((bugsC) => (
                                            <div className="commentContainer">
                                                <div className="commentSection">
                                                    <div className="comment mt-4 text-justify float-left">
                                                        <span className="commentp">{bugsC.postedBy}</span>
                                                        <span>{"- " + bugsC.postedAt[1] + "/" + bugsC.postedAt[2] + "/" + bugsC.postedAt[0]}</span>
                                                        <span>{login.roles === "admin" && <button onClick={() => deleteComment(bugs.bugId, bugsC.id)} className="btn  btn-danger btn-sm commentButton">{<MdDeleteForever />}</button>}</span>
                                                        <br />
                                                        <div className="commentd"><span >{bugsC.text} </span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : []}
                                    </div>
                                    <div className="cardComment">
                                        <div class="input-group mb-3">
                                            <input type="textbox" className="form-control" placeholder="Enter your comment" onChange={(e) => setComments(e.target.value)} />
                                            <div className="input-group-append">
                                                <button onClick={() => postComent(bugs.bugId)} className="btn btn-success" type="button">Post</button>
                                            </div>
                                        </div>
                                    </div>

                                </VerticalTimelineElement>
                            )) : []}
                    </VerticalTimeline>}


                <Modal show={modal} onHide={() => handleModal(false)}>
                    <Modal.Body>
                        <div className="input-group mb-3 justify-content-center ">
                            <input className="input-group-text " disabled={true} value={"ID: " + ID}></input>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-group-text" placeholder="Title"></input>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="input-group-text" type="textbox" placeholder="Description"></textarea>
                        </div>
                        {login.roles === "admin" &&
                            <div className="input-group mb-3 justify-content-center">
                                <select value={asignTo} onChange={(e) => setAsignTo(e.target.value)} id="state" className="input-group-text">
                                    <option>Ali Kachef </option>
                                    <option>Robert Warren </option>
                                    <option>Noah</option>
                                </select>
                            </div>
                        }
                        {login.roles === "admin" &&
                            <div className="input-group mb-3 justify-content-center">
                                <select value={status} onChange={(e) => setStatus(e.target.value)} id="state" className="input-group-text">
                                    <option>Open</option>
                                    <option>Close</option>
                                </select>
                            </div>
                        }
                        {login.roles === "admin" &&
                            <div className="input-group mb-3 justify-content-center">
                                <select value={urgency} onChange={(e) => setUrgency(e.target.value)} id="state" className="input-group-text">
                                    <option>Urgent</option>
                                    <option>Top</option>
                                    <option>Modrate</option>
                                    <option>low</option>
                                </select>
                            </div>}

                    </Modal.Body>
                    <Modal.Footer>
                        <button disabled={!buttonHandle} className="btn btn-success" onClick={(e) => addbug(e)} >Add</button>
                        <button disabled={buttonHandle} className="btn btn-primary" onClick={(e) => updateCourse(e)}>Update</button>
                        <button className="btn btn-danger" onClick={() => closeModal()} >close</button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalUser} onHide={() => handleModalUser()}>
                    <Modal.Body>
                        <div className="input-group mb-3 justify-content-center ">
                            <input className="input-group-text " disabled={true} value={"ID: " + IDuser}></input>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <input value={name} onChange={(e) => setName(e.target.value)} className="input-group-text" placeholder="Name"></input>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-group-text" placeholder="Email"></input>
                        </div>
                        {login.roles === "admin" &&
                            <div className="input-group mb-3 justify-content-center">
                                <select value={role} onChange={(e) => setRole(e.target.value)} id="state" className="input-group-text">
                                    <option>user</option>
                                    <option>admin</option>
                                </select>
                            </div>
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <button disabled={buttonHandle} className="btn btn-primary" onClick={(e) => updateUser(e)}>Update</button>
                        <button className="btn btn-danger" onClick={() => handleModalUser()} >close</button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )
}

export default Dashboard