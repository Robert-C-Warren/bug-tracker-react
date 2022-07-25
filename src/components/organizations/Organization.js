import "../user-page/Dashboard.css"
import React, { useEffect, useState } from "react"
import icon from '../../components/icon-bug-15.jpg'
import axios from "axios";
import { Modal, Card } from 'react-bootstrap';
import { fetchUserData, fetchOrganizations, getToken } from '../api/authenticationService'
import './Organization.css'

const Organization = () => {
    const [loading, setLoading] = useState(false);
    const [organs, setOrgans] = useState([]);
    const [login, setLogin] = useState("");
    const [modal, setModal] = useState(false)
    const [modalUser, setModalUser] = useState(false);
    const [buttonHandle, setButton] = useState();

    const [ID, setID] = useState();
    const [organizationName, setOrganisationName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [organizationDescription, setOrganisationDescription] = useState();
    const [bugs, setBugs] = useState();

    const logout = () => {
        localStorage.clear();
        window.location.href = '/'
    }

    React.useEffect(() => {
        fetchOrganizations().then((response) => {
            setOrgans(response.data)
            setLoading(true)
            closeModal()
        })
        fetchUserData().then((response) => setLogin(response.data))
    }, [])

    const getOrganizations = async () => {
        await fetchOrganizations().then(reponse => {
            setOrgans(reponse.data)
            setLoading(true)
        })
    }

    const addorgan = async () => {
        const organization = {
            "organizationName": organizationName,
            "organizationDescription": organizationDescription,
            "imageUrl": imageUrl
        }
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        await axios.post("http://localhost:8080/organ", organization, yourConfig)
        setModal(false)
        setTimeout(function () {
            getOrganizations()
            closeModal()
        }, 250)
    }

    const organDash = async (organId) => {
        localStorage.setItem("CurrentOrganization", organId)
        window.location.href = "/organization"

    }

    const closeModal = () => {
        setID(organs[organs.length - 1].organizationId + 1)
        setOrganisationName('')
        setOrganisationDescription('')
        setImageUrl("")
        handleModal()

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

    const organUpdate = (id, imageUrl, name, description, bugs) => {
        setButton(false)
        setID(id)
        setImageUrl(imageUrl)
        setOrganisationName(name)
        setOrganisationDescription(description)
        setBugs(bugs)
        addEditHandle();
    }

    const updateOrgan = async () => {
        const organization = {
            "organizationId": ID,
            "organizationName": organizationName,
            "organizationDescription": organizationDescription,
            "imageUrl": imageUrl,
            "organizationBug": bugs
        }
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
        await axios.put("http://localhost:8080/organ", organization, yourConfig)
        setModal(false)
        setTimeout(function () {
            getOrganizations()
            closeModal()
        }, 250)
    }

    const organDelete = (id) => {
        let yourConfig = {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
         axios.delete("http://localhost:8080/organ/" + id,  yourConfig)
        setTimeout(function () {
            getOrganizations()
            closeModal()
        }, 250)
    }



    return (
        <>
            <div className="dashboard-fullpage">
                <nav className="navbar  navbar-dark bg-dark">
                    <div className="dash">
                        < img className="imageIcon" src={icon} />
                        <h3 className="m-2 text-white">Browse Organizations</h3>
                    </div>
                    <div className="navAdd">
                        <h4 className="text-white">{login.name}</h4>
                        {login.roles === "admin" && <button onClick={(e) => addEditHandle(e)} className="m-2 btn btn-primary">Add</button>}
                        <button className="m-2 btn btn-outline-light" onClick={() => logout()}>Logout</button>
                    </div>
                </nav>
            </div>
            <div className="   bugs-container">
                <div className=" bugs-cards">
                    <div className="  container ">
                        <div >
                            {loading ?
                                <div className=" cards">
                                    {Array.isArray(organs) ? organs.map((organs) => (
                                        <div className="pb-5 cards-in">
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img className=" pt-3 pb-3 m-auto" style={{ width: '100px' }} variant="top" src={organs.imageUrl} />
                                                <Card.Body >
                                                    <Card.Title>{organs.organizationName}</Card.Title>
                                                    <Card.Text>{organs.organizationDescription}</Card.Text>
                                                    <button className=" btn btn-primary" onClick={() => organDash(organs.organizationId)}>Go</button>
                                                    {login.roles === "admin" && <button className="m-1 btn btn-primary" onClick={() => organUpdate(organs.organizationId, organs.imageUrl, organs.organizationName, organs.organizationDescription, organs.organizationBug)}>Update</button>}
                                                    {login.roles === "admin" && <button className="btn btn-danger" onClick={() => organDelete(organs.organizationId)}>Delete</button>}
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )) : []}
                                </div> :
                                <div class="spinner-grow text-primary" role="status"></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={modal} onHide={() => handleModal(false)}>
                <Modal.Body>
                    <div className="input-group mb-3 justify-content-center ">
                        <input className="input-group-text " disabled={true} value={"ID: " + ID}></input>
                    </div>

                    <div className="input-group mb-3 justify-content-center">
                        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input-group-text" placeholder="Image URL"></input>
                    </div>
                    <div className="input-group mb-3 justify-content-center">
                        <input value={organizationName} onChange={(e) => setOrganisationName(e.target.value)} className="input-group-text" placeholder="Name"></input>
                    </div>
                    <div className="input-group mb-3 justify-content-center">
                        <textarea value={organizationDescription} onChange={(e) => setOrganisationDescription(e.target.value)} className="input-group-text" type="textbox" placeholder="Description"></textarea>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button disabled={!buttonHandle} className="btn btn-success" onClick={(e) => addorgan(e)} >Add</button>
                    <button disabled={buttonHandle} className="btn btn-primary" onClick={(e) => updateOrgan(e)}>Update</button>
                    <button className="btn btn-danger" onClick={() => closeModal()} >close</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Organization;