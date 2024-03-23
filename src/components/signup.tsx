import React, { useState } from "react";
<<<<<<< HEAD:src/signup.tsx
import "./signup.css";
import { collection, addDoc } from "firebase/firestore";
import {
    authenticateWithGoogle,
    createUser,
    createUserAndStoreAccountType,
    signUpWithGoogle,
} from "./firebase";
=======
import "../css/signup.css";
import { signUpWithGoogle } from "../auth";
import { createUserAndStoreAccountType } from "../db";
>>>>>>> 824303cfe0ac817b76cef1d02eefa3aad49901bd:src/components/signup.tsx
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
import { validateEmail } from "../utils";

interface SignUpProps {
    onSubmit: (email: string, password: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
    const [accountType, setAccountType] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState(false);
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
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        if (!accountType) {
            setAccountTypeError(true);
            return;
        }
        const success = await createUserAndStoreAccountType(
            email,
            password,
            accountType
        );
<<<<<<< HEAD:src/signup.tsx
        if (success) {
            let path = `/dashboard`;
            navigate(path);
        } else setSignupError(true);
=======
        if (success) navigate("/dashboard");
        else setSignupError(true);
>>>>>>> 824303cfe0ac817b76cef1d02eefa3aad49901bd:src/components/signup.tsx
    };

    const googleLogin = async () => {
        if (!accountType) {
            setAccountTypeError(true);
            return;
        }
        try {
            const googleAuth = await signUpWithGoogle(accountType);
            if (googleAuth) {
                let path = `/dashboard`;
                navigate(path);
            } else {
<<<<<<< HEAD:src/signup.tsx
                alert("Google Sign In Unsuccessful");
            }
        } catch (error) {
            alert("Google Sign In Unsuccessful");
=======
                alert("Google Sign In Unsuccessful")
                setSignupError(true);
            }
        } catch (error) {
            alert("Google Sign In Unsuccessful")
            setSignupError(true);
>>>>>>> 824303cfe0ac817b76cef1d02eefa3aad49901bd:src/components/signup.tsx
        }
    };

    return (
        <Layout footer={2} headerBtn={true}>
            <div
                className="container"
                style={{
                    backgroundImage: `url("/images/blurredbackground.jpg")`,
                    backgroundSize: "cover", // Optional: Adjust background size as needed
                    backgroundPosition: "center", // Optional: Adjust background position as needed
                    height: "800px",
                }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
<<<<<<< HEAD:src/signup.tsx
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
                                <Select
                                    label="Account"
                                    id="demo-simple-select"
                                    value={accountType}
                                    onChange={handleAccountTypeChange}
                                    style={{ width: "241.54px" }}
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
=======
                    <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <Row style={{ padding: "10px" }}>
                        <InputLabel id="AccountTypeLabel">Account Type</InputLabel>
                            <Select
                                labelId="AccountTypeLabel"
                                value={accountType}
                                onChange={handleAccountTypeChange}
                                style={{ width: "241.54px" }}
                                placeholder="Account Type"
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
>>>>>>> 824303cfe0ac817b76cef1d02eefa3aad49901bd:src/components/signup.tsx
            </div>
        </Layout>
    );
};

export default SignUp;
