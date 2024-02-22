import React, { useState } from "react";
import "./signup.css";
import { collection, addDoc } from "firebase/firestore";
import { authenticateWithGoogle, createUser, createUserAndStoreAccountType, signUpWithGoogle } from "./firebase";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Col, Row } from "react-bootstrap";
import Layout from "./layout/Layout";
import {
    Button,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";

interface SignUpProps {
    onSubmit: (email: string, password: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
    const [accountType, setAccountType] = useState<string>("Account Type");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState(false);
    const [signUpError, setSignupError] = useState(false);
    const navigate = useNavigate();

    const handleAccountTypeChange = (event: SelectChangeEvent) => {
        setAccountType(event.target.value as string);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(event.target.value);
        if (password === confirmPassword) {
            setPasswordError(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        alert("here1");
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        const success = await createUserAndStoreAccountType(
            email,
            password,
            accountType
        );
        if (success) redirect("/dashboard");
        else setSignupError(true);
    };

    const googleLogin = async () => {
        try {
            const googleAuth = await signUpWithGoogle(accountType);
            if(googleAuth) {
                let path = `/dashboard`;
                navigate(path);
            } else {
                alert("Google Sign In Unsuccessful")
            }
        } catch (error) {
            alert("Google Sign In Unsuccessful")
        }
    }

    return (
        <Layout footer={2} headerBtn={true}>
            <div className = "container" style ={{
                backgroundImage: `url("/images/blurredbackground.jpg")`,
                backgroundSize: "cover", // Optional: Adjust background size as needed
                backgroundPosition: "center", // Optional: Adjust background position as needed
                height: "800px",
            }}>
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Paper
                    elevation={8}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "300px",
                        padding: "20px",
                        marginTop: "100px"
                    }}
                >
                    <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <Row style={{ padding: "10px" }}>
                            <Select
                                label="Account"
                                id="demo-simple-select"
                                value={accountType}
                                onChange={handleAccountTypeChange}
                                style={{ width: "241.54px" }}
                            >
                                <MenuItem value={"Student"}>Student</MenuItem>
                                <MenuItem value={"Staff"}>Administrator</MenuItem>
                            </Select>
                        </Row>
                        <Row style={{ padding: "10px" }}>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Email"
                                required
                            />
                        </Row>
                        <Row style={{ padding: "10px" }}>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </Row>
                        <Row style={{ padding: "10px" }}>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </Row>
                        {passwordError && (
                            <Row style={{ color: "red", padding: "10px" }}>
                                Passwords do not match.
                            </Row>
                        )}
                        {signUpError && (
                            <Row style={{ color: "red", padding: "10px" }}>
                                Error registering user.
                                <br /> Try logging in
                            </Row>
                        )}
                        <Button
                            size="large"
                            variant="contained"
                            type="submit"
                            sx={{
                                marginTop: "10px",
                                textAlign: "center",
                                fontSize: "1.0rem",
                                fontWeight: 600,
                                width: "100%",
                                height: 60,
                                backgroundColor: "primary.main",
                                textTransform: "none",
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            onClick={() => googleLogin()}
                            sx={{
                                marginTop: "10px",
                                textAlign: "center",
                                fontSize: "1.0rem",
                                fontWeight: 600,
                                width: "100%",
                                height: 60,
                                backgroundColor: "primary.main",
                                textTransform: "none",
                            }}
                        >
                            Sign up with Google
                        </Button>
                    </form>
                </Paper>
            </Box>
            </div>
        </Layout>
    );
};

export default SignUp;
