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
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        </div>
                    </div>
                    <hr></hr>

                </div>


            </main>
        </>
    )
}

export default Home