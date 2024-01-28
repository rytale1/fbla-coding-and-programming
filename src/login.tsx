import React, { useState } from "react";
import "./css/globals.css";
import "./signup.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Col, Row } from "react-bootstrap";
import Layout from "./layout/Layout";

interface LoginProps {
    onSubmit: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
                    style={{ width: "400px", padding: "20px" }}
                >
                    <h2 style={{ marginBottom: "20px" }}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <Row style={{ padding: "10px" }}>
                            <Col>
                                <label htmlFor="email">Email:</label>
                            </Col>
                            <Col>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row style={{ padding: "10px" }}>
                            <Col>
                                <label htmlFor="password">Password:</label>
                            </Col>
                            <Col>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <button style={{ marginTop: "10px" }} type="submit">
                            Login
                        </button>
                    </form>
                </Paper>
            </Box>
        </Layout>
    );
};

export default Login;
