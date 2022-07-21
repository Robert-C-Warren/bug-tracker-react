import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import icon from '../../components/icon-bug-15.jpg'
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import img7 from "./Assets/img7.webp"

import "./Home.css"



const Home = () => {
    return (
        <>

            <main role="main">
                <nav className="navbar  navbar-dark bg-dark">
                    <div className="dash">
                        < img className="imageIcon" src={icon} />
                        <h3 className="m-2 text-white">Bug Tracker</h3>
                    </div>
                    <div className="navAdd">
                        <a href="/login" type="button" className=" m-2 btn btn-outline-primary">Login</a>
                    </div>
                </nav>
                <div className="main-body">
                    <div className="jumbotron">
                        <div className="container text-white">

                            <div className="banner-container">
                                <div className="banner">
                                    <h1 className="display-3">Bug Manager</h1>
                                    <p>Our bug reporting tool is must have for every Organization. We make it very easy for your user to comunicate and report any issue and not only That. We also provide them with a simple alegent display of your current work Roadmap that explains what the company completed and yet to complete </p>
                                    <p><a className="btn btn-primary btn-lg" href="/signup" role="button">Get Started &raquo;</a></p>
                                </div>
                                <img className="imgbanner" src={img7}></img>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="p-4 text-white container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Report</h2>

                            <p>Build product roadmaps. Let users Comment on feature requests with your very own embeddable product roadmap. Discover what your users really want. </p>


                        </div>
                        <div className="col-md-4">
                            <h2>Handel</h2>
                            <p>Customized interface. As Admin you have all the tools to edit and manage requests. User view aloows you to see exactly what your user see. display what you are working on and show off what issues were resolved </p>
                        </div>
                        <div className="col-md-4">
                            <h2>Manage</h2>
                            <p>Users reports are not always acurate or vaiable. with our platform users cant post or edit your roadmap. each inquery or report the user submits, it will be directly sent to you as unpublised and you have the otion to edit before publshing</p>
                        </div>
                    </div>
                    <hr></hr>

                </div>


            </main>
        </>
    )
}

export default Home