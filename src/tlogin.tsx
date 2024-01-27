import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import "./css/bootstrap.min.css";
import "./css/globals.css";
import { Navigate, useNavigate } from "react-router-dom";
import { textAlign } from "@mui/system";

function TLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);
    const sendToLoginPage = () => {
        navigate("/tsignup");
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Login successful, handle the user or redirect to another page
            navigate("/tonboard");
        } catch (error) {
            // Login error, display or handle the error accordingly
            alert("Invalid login! Please sign up if you haven't already!");
            navigate("/tsignup");
        }
    };

    return (
        <div
            className="container"
            style={{
                backgroundImage:
                    'url("https://w0.peakpx.com/wallpaper/286/917/HD-wallpaper-mountain-collage-mountains-sunset-collage-clouds-sky-busy.jpg")',
                width: "2000px",
            }}
        >
            <img
                className="login-image"
                src="https://image.imgcreator.ai/ImgCreator/af7e0d0b76d849d794aa1b8bc527df2e/hq/b126775c-0bbd-11ee-b02a-0242ac110003_0.webp"
            ></img>
            <div className="login">
                <h1
                    className="company-header"
                    style={{
                        fontSize: "60px",
                        textAlign: "center",
                    }}
                >
                    𝔖𝔱𝔞𝔯𝔤𝔯𝔞𝔪
                </h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    <button className="btn-secondary" onClick={sendToLoginPage}>
                        Sign Up Here
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TLogin;
