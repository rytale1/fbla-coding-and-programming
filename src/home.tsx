import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

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
import "./css/globals.css";

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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>This is our home page!</h1>
            {/*<h1>Welcome to PLACEHOLDER</h1>
            <p>Please Login to Your Account</p>
            <button onClick={routeSignup}>Sign Up</button>
    <button onClick={routeLogin}>Login</button>*/}
        </div>
    );
};

// Export the component for use in other files
export default Home;
