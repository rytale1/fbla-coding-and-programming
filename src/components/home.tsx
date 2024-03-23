import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth";
import Layout from "../layout/Layout";
import PageTitle from "../layout/PageTitle";
import "../css/globals.css";
import { Button } from "@mui/material";

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

interface HomePageProps {}

const Home: React.FC<HomePageProps> = () => {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Layout footer={2} headerBtn={true}>
            <div style={{ scrollBehavior: "smooth" }}>
                <PageTitle
                    pageTitle="CareerBase - Where careers are found"
                    description="CareerBase is a database created to help high schoolers find careers and job opportunities"
                />
                <section id="hero-3" className="bg-scroll division">
                    <div
                        className="container"
                        style={{
                            backgroundImage: `url("/images/background.jpg")`,
                            backgroundSize: "cover", // Adjust background size as needed
                            backgroundPosition: "center", // Adjust background position as needed
                            height: "800px",
                        }}
                    >
                        <div className="row d-flex align-items-center">
                            <div
                                className="col-sm-12"
                                style={{ marginTop: "100px" }}
                            >
                                <div className="hero-txt mb-40 text-center">
                                    <h1
                                        style={{
                                            color: "white",
                                            marginTop: "125px",
                                        }}
                                    >
                                        Career Database for High Schoolers
                                    </h1>
                                    <h2 style={{ color: "white" }}>
                                        Career opportunities for high schoolers,
                                        powered by CareerBase
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
                                        onClick={() => scrollTo("about")}
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
                                        onClick={routeLogin}
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About Section */}
                <section className="section bg-light" id="about">
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <h2
                            className="section-title"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "700px",
                            }}
                        >
                            About
                        </h2>
                    </div>
                    <div
                        className="container"
                        style={{
                            display: "flex",
                            padding: "40px",
                        }}
                    >
                        <p
                            style={{
                                width: "75%",
                            }}
                        >
                            <img
                                src="images/thumbnail1.png"
                                width="450"
                                style={{
                                    float: "left",
                                    marginRight: "30px",
                                }}
                                alt="example dashboard"
                            />
                            Thank you for your interest in CareerBase!
                            CareerBase is an open-source webapp designed to
                            empower the Career and Technical Education
                            Departments across high schools by providing a
                            dynamic database to store crucial information
                            regarding local/community business partners for the
                            school. Administrator accounts can store information
                            varying from business name, links to website, type,
                            location, or age etc. Students can then log on to
                            student accounts to view and search but not edit the
                            information.
                        </p>
                    </div>
                </section>
                {/* Getting Started Section */}
                <section className="section bg-light" id="instructions">
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <h2
                            className="section-title"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "700px",
                            }}
                        >
                            Instructions
                        </h2>
                    </div>
                    <div
                        className="container"
                        style={{
                            display: "flex",
                            padding: "40px",
                            justifyContent: "vertical",
                        }}
                    >
                        <p
                            style={{
                                width: "75%",
                            }}
                        >
                            <img
                                src="images/thumbnail2.png"
                                width="450"
                                style={{
                                    float: "left",
                                    marginRight: "30px",
                                }}
                                alt="example signup"
                            />
<<<<<<< HEAD:src/home.tsx
                            Are you a registered user? If so please sign in.
                            Else please head over to the sign up page by
                            clicking the button on the top right.
                            <br />
                            <br />
                            <h5>Signing up</h5>
                            All we need is your email and a password! You can
                            also choose to sign up with Google. You can also
                            sign up as either a school administrator or student.
                            If you sign up as a student, you will have no edit
                            permissions to the database.
=======
                            Are you a registered user? Sign in by clicking the sign in button on the 
                            top right. If not, then please sign up.
                            <br/>
                            <br/>
                            <h5>
                                Signing up
                            </h5>
                            All we need is your email and a password! You can also choose to sign up with Google.
                            You can sign up as either a school administrator or student. If you
                            sign up as a student, you will have no edit permissions to the database.
>>>>>>> 824303cfe0ac817b76cef1d02eefa3aad49901bd:src/components/home.tsx
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
