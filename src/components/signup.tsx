import React, { useState } from "react";
import "../css/signup.css";
import { signUpWithGoogle } from "../auth";
import { createUserAndStoreAccountType } from "../db";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Row } from "react-bootstrap";
import Layout from "../layout/Layout";
import {
    Button,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePasswordStrength } from "../utils";

type PasswordError = "mismatch" | "weak" | "";

interface SignUpProps {
    onSubmit: (email: string, password: string) => void;
}
const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
    const [accountType, setAccountType] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<PasswordError>("");
    const [signUpError, setSignupError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [accountTypeError, setAccountTypeError] = useState(false);
    const navigate = useNavigate();
    const handleAccountTypeChange = (event: SelectChangeEvent) => {
        setAccountType(event.target.value as string);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError(!validateEmail(event.target.value));
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
        let validationResult = !validatePasswordStrength(event.target.value);
        //Call to password strength validation
        if (validationResult) {
            setPasswordError("weak");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(event.target.value);
        if (password === confirmPassword) {
            setPasswordError("mismatch");
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //Input validation: password && confirm password fields mismatch
        if (password !== confirmPassword) {
            setPasswordError("mismatch");
            return;
        //Input validation: password strength
        }
        if (!validatePasswordStrength(password)) {
            setPasswordError("weak");
        }
        //Input validation: account type not filled out
        if (!accountType) {
            setAccountTypeError(true);
            return;
        }
        //Calls the backend to store user data
        const success = await createUserAndStoreAccountType(
            email,
            password,
            accountType
        );
        //Routes to dashboard upon successful sign-up
        if (success) navigate("/dashboard");
        else setSignupError(true);
    };

    //Enables signing up/signing in with Google
    const googleLogin = async () => {
        if (!accountType) {
            setAccountTypeError(true);
            return;
        }
        try {
            //Communication between frontend and backend
            const googleAuth = await signUpWithGoogle(accountType);
            if (googleAuth) {
                let path = `/dashboard`;
                navigate(path);
            } else {
                alert("Google Sign In Unsuccessful");
                setSignupError(true);
            }
        } catch (error) {
            alert("Google Sign In Unsuccessful");
            setSignupError(true);
        }
    };
    return (
        <Layout footer={2} headerBtn={true}>
            <div
                className="container"
                style={{
                    backgroundImage: `url("/images/blurredbackground.jpg")`,
                    backgroundSize: "cover", // Adjust background size as needed
                    backgroundPosition: "center", // Adjust background position as needed
                    height: "800px",
                }}
            >
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
                            marginTop: "100px",
                        }}
                    >
                        <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <Row style={{ padding: "10px" }}>
                                <InputLabel id="AccountTypeLabel"
                                style = {{
                                    marginLeft: "12.5px"
                                }}>
                                    Account Type
                                </InputLabel>
                                <Select
                                    labelId="AccountTypeLabel"
                                    value={accountType}
                                    onChange={handleAccountTypeChange}
                                    style={{ 
                                        width: "241.54px",
                                        marginLeft: "12.5px"
                                    }}
                                    placeholder="Account Type"
                                >
                                    <MenuItem value={"Student"}>
                                        Student
                                    </MenuItem>
                                    <MenuItem value={"Staff"}>
                                        Administrator
                                    </MenuItem>
                                </Select>
                            </Row>
                            <Row style={{ padding: "10px" }}>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Email"
                                    style = {{marginLeft: "10px"}}
                                    required
                                />
                            </Row>
                            {emailError && (
                                <Row style={{ color: "red", padding: "10px" }}>
                                    Email is invalid.
                                </Row>
                            )}
                            <Row style={{ padding: "10px" }}>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    style = {{marginLeft: "10px"}}
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
                                    style = {{marginLeft: "10px"}}
                                    required
                                />
                            </Row>
                            {passwordError === "mismatch" && (
                                <Row style={{ color: "red", padding: "10px" }}>
                                    Passwords do not match.
                                </Row>
                            )}
                            {passwordError === "weak" && (
                                <Row style={{ color: "red", padding: "10px", fontSize: "12.2px" }}>
                                    Password is too weak. Ensure password has: 
                                    <li>
                                        Length of at least 8 characters
                                    </li>
                                    <li>
                                        2 numbers
                                    </li>
                                    <li>
                                        One special character (!@#$&*)
                                    </li>
                                </Row>
                            )}
                            {accountTypeError && (
                                <Row style={{ color: "red", padding: "10px" }}>
                                    Please select an Account Type.
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
