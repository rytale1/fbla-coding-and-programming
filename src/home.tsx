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

    // Return the JSX structure of the component
    return (
        <Layout footer={2} headerBtn={true}>
            <div>
                <PageTitle
                    pageTitle="CareerBase - Where careers are found"
                    description="CareerBase is a database created to help high schoolers find careers and job opportunities"
                />
                <section id="hero-3" className="bg-scroll division">
                    <div
                        className="container"
                        style={{
                            backgroundImage: "/images/mainbackground.png",
                            backgroundSize: "cover", // Optional: Adjust background size as needed
                            backgroundPosition: "center", // Optional: Adjust background position as needed
                            height: "600px",
                            border: "10px solid black",
                        }}
                    >
                        <div className="row d-flex align-items-center">
                            <div
                                className="col-sm-12"
                                style={{ marginTop: "100px" }}
                            >
                                <div className="hero-txt mb-40 text-center">
                                    <h1>Career Database for High Schoolers</h1>
                                    <h2>
                                        Career opportunities for
                                        <br /> high schoolers, powered by
                                        CareerBase
                                    </h2>
                                    <p
                                        style={{
                                            marginBottom: "30px",
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
                                            textTransform: "none",
                                        }}
                                    >
                                        Try Free
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Jobs Section */}
                <section className="section">
                    <div className="container">
                        <h2 className="section-title">Featured Jobs</h2>
                        <Row>
                            <Col>
                                <div className="job-card">
                                    <h3 className="job-title">
                                        Software Engineer
                                    </h3>
                                    <p className="job-company">TechCorp</p>
                                    <p className="job-location">
                                        San Francisco, CA
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Apply
                                    </a>
                                </div>
                            </Col>
                            <Col>
                                <div className="job-card">
                                    <h3 className="job-title">
                                        Graphic Designer
                                    </h3>
                                    <p className="job-company">Design Inc.</p>
                                    <p className="job-location">New York, NY</p>
                                    <a href="#" className="btn btn-primary">
                                        Apply
                                    </a>
                                </div>
                            </Col>
                            <Col>
                                <div className="job-card">
                                    <h3 className="job-title">Data Analyst</h3>
                                    <p className="job-company">Data Masters</p>
                                    <p className="job-location">Austin, TX</p>
                                    <a href="#" className="btn btn-primary">
                                        Apply
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Search Bar */}
                <section className="section bg-light">
                    <SearchBar />
                </section>

                {/* Testimonials Section */}
                <section className="section">
                    <div className="container">
                        <h2 className="section-title">Testimonials</h2>
                        {/* Add testimonials or success stories here */}
                    </div>
                </section>

                {/* Resources Section */}
                <section className="section bg-light">
                    <div className="container">
                        <h2 className="section-title">Resources</h2>
                        {/* Add resources such as resume tips, interview guides, etc. here */}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

// Export the component for use in other files
export default Home;
