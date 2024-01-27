import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Layout from "./layout/Layout";
import PageTitle from "./layout/PageTitle";
import "./css/globals.css";

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
            <PageTitle
                pageTitle="CareerBase - Where careers are found"
                description="CareerBase is a database created to help high schoolers find careers and job opportunities"
            />
            <section id="hero-3" className="bg-scroll division">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-12">
                            <div className="hero-txt mb-40 text-center">
                                <h1>Career Database for High Schoolers</h1>
                                <h2>
                                    Career opportunities for
                                    <br /> high schoolers, powered by CareerBase
                                </h2>
                                <p style={{ marginBottom: "30px" }}>
                                    Empower your search for opportunities with
                                    CareerBase, a comprehensive database for
                                    high school job opportunities.
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
                    </div>
                </div>
            </section>
        </Layout>
    );
};

// Export the component for use in other files
export default Home;
