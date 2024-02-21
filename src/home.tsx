import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Layout from "./layout/Layout";
import PageTitle from "./layout/PageTitle";
import SearchBar from "./Searchbar";
import "./css/globals.css";
import { Button } from "@mui/material";
import { Col, Row } from "react-bootstrap";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("logged in", uid);
        // ...
    } else {
        console.log("signed out");
    }
});

// Define the type for the component props (if needed)
interface HomePageProps {}

// Create the functional component
const Home: React.FC<HomePageProps> = () => {
    // Define state variables using the useState hook
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const routeSignup = () => {
        let path = `/signup`;
        navigate(path);
    };

    const routeLogin = () => {
        let path = `/login`;
        navigate(path);
    };

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if(element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    }

    // Return the JSX structure of the component
    return (
        <Layout footer={2} headerBtn={true}>
            <div style = {{scrollBehavior : "smooth"}}>
                <PageTitle
                    pageTitle="CareerBase - Where careers are found"
                    description="CareerBase is a database created to help high schoolers find careers and job opportunities"
                />
                <section id="hero-3" className="bg-scroll division">
                    <div
                        className="container"
                        style={{
                            backgroundImage: `url("/images/background.jpg")`,
                            backgroundSize: "cover", // Optional: Adjust background size as needed
                            backgroundPosition: "center", // Optional: Adjust background position as needed
                            height: "800px",
                        }}>
                        <div className="row d-flex align-items-center">
                            <div
                                className="col-sm-12"
                                style={{ marginTop: "100px" }}>
                                <div className="hero-txt mb-40 text-center">
                                    <h1
                                    style={{ color : "white", marginTop: "125px"}}>Career Database for High Schoolers</h1>
                                    <h2
                                    style={{ color: "white"}}>
                                        Career opportunities for
                                        high schoolers, powered by
                                        CareerBase
                                    </h2>
                                    <p
                                        style={{
                                            marginBottom: "30px",
                                            color: "white",
                                        }}
                                    >
                                        Empower your search for opportunities
                                        with CareerBase, a comprehensive
                                        database for high school job
                                        opportunities.
                                    </p>
                                    {/*<video
                                    src=""
                                    width="640"
                                    playsInline={true}
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                 />*/}
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12">
                                <div className="mb-40 text-center">
                                    <Button
                                        size="large"
                                        variant="contained"
                                        sx={{
                                            margin: 3,
                                            textAlign: "center",
                                            fontSize: "1.0rem",
                                            fontWeight: 600,
                                            width: 250,
                                            height: 60,
                                            backgroundColor: "primary.main",
                                            textTransform: "none"
                                        }}
                                        onClick = {() => scrollTo("about")}
                                    >
                                        About CareerBase
                                    </Button>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        sx={{
                                            margin: 3,
                                            textAlign: "center",
                                            fontSize: "1.0rem",
                                            fontWeight: 600,
                                            width: 250,
                                            height: 60,
                                            backgroundColor: "primary.main",
                                            textTransform: "none",
                                        }}
                                        onClick = {() => scrollTo("instructions")}
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About Section */}
                <section className="section bg-light"  id = "about">
                    <div className="container">
                        <h2 className="section-title" style = {{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "700px",
                            }}>About</h2>
                    </div>
                    <div className="container" style={{
                        display: "flex",
                        padding: "40px",
                    }}>
                        <p style={{
                            width : "75%"
                        }}>
                            <img src="images/placeholder.png" width="450"
                            style= {{
                                float: "left",
                                marginRight: "30px"
                            }}/>
                            Thank you for your interest in CareerBase! 
                            CareerBase is an open-source webapp designed to empower 
                            the Career and Technical Education Departments across high 
                            schools by providing a dynamic database to store crucial
                            information regarding local/community business partners 
                            for the school. Administrator accounts can store information 
                            varying from business name, links to website, type, location, or age etc. 
                            Students can then log on to student accounts to view and search 
                            but not edit the information.
                        </p>
                    </div>
                </section>
                {/* Instructions Section */}
                <section className="section bg-light"  id = "instructions">
                    <div className="container">
                        <h2 className="section-title" style = {{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "700px",
                            paddingTop: "50px"
                            }}>Getting Started</h2>
                    </div>
                    <div className="container" style={{
                        display: "flex",
                        padding: "40px",
                    }}>
                        <p style={{
                            width : "75%"
                        }}>
                            <img src="images/placeholder.png" width="450"
                            style= {{
                                float: "left",
                                marginRight: "30px"
                            }}/>
                            Placeholder Text
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

// Export the component for use in other files
export default Home;
