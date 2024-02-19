import React, { useState } from "react";
import "./css/globals.css";
import "./signup.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Col, Row } from "react-bootstrap";
import Layout from "./layout/Layout";
import { Button } from "@mui/material";
import { auth, authenticateWithGoogle, logout } from "./firebase";

interface LoginProps {
    onSubmit: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginState, setLoginState] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(email, password);
    };

    console.log("current user: ", auth?.currentUser);

    return (
        <Layout footer={2} headerBtn={true}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Paper
                    elevation={8}
                    style={{ display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    width: "300px", padding: "20px" }}
                >
                    <h2 style={{ marginBottom: "20px" }}>Login</h2>
                    <form onSubmit={handleSubmit}>
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
                        <Button size="large"
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
                            }}>
                            Login
                        </Button>
                        <Button size="large"
                            variant="contained"
                            onClick={() => authenticateWithGoogle()}
                            sx={{
                                marginTop: "10px",
                                textAlign: "center",
                                fontSize: "1.0rem",
                                fontWeight: 600,
                                width: "100%",
                                height: 60,
                                backgroundColor: "primary.main",
                                textTransform: "none",
                            }}>
                            Sign in with Google
                        </Button>
                        <Button size="large"
                            variant="contained"
                            onClick = {() => logout()}
                            sx={{
                                marginTop: "10px",
                                textAlign: "center",
                                fontSize: "1.0rem",
                                fontWeight: 600,
                                width: "100%",
                                height: 60,
                                backgroundColor: "primary.main",
                                textTransform: "none",
                            }}>
                            Log out
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Layout>
    );
};

export default Login;
