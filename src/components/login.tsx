import React, { useState } from "react";
import "../css/globals.css";
import "../css/signup.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Row } from "react-bootstrap";
import Layout from "../layout/Layout";
import { Button } from "@mui/material";
import { authenticateWithGoogle, authenticateUser } from "../auth";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


interface LoginProps {
    onSubmit: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [authError, setAuthError] = useState<boolean>(false);
    const navigate = useNavigate();

    const routeDashboard = async () => {
        let path = `/dashboard`;
        //Routes to dashboard through navigate
        const auth = await authenticateUser(email, password);
        if (auth) {
            navigate(path);
        }
    };

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    // Initiate authentication with google through Firebase
    const googleLogin = async () => {
        try {
            const googleAuth = await authenticateWithGoogle();
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

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    //Routes to dashboard once login is successful.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await authenticateUser(email, password);
        if(success) {
            onSubmit(email, password);
            redirect("/dashboard");
        } else {
            setAuthError(true);
            return;
        }
    };

    return (
        <Layout footer={2} headerBtn={true}>
            <div className = "container" style ={{
                backgroundImage: `url("/images/blurredbackground.jpg")`,
                backgroundSize: "cover", 
                backgroundPosition: "center", 
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
                    }}
                >
                    <h2 style={{ marginBottom: "20px" }}>Sign In</h2>
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
                        <Button
                            size="large"
                            variant="contained"
                            type="submit"
                            onClick={() => routeDashboard()}
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
                            Sign In
                        </Button>
                        {authError && (
                            <Row style={{ color: "red", padding: "10px" }}>
                                Failed to sign in. Please check if your email or password has been entered
                                correctly.
                            </Row>
                        )}
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
                            Sign in with Google
                        </Button>
                    </form>
                </Paper>
            </Box>
            </div>
        </Layout>
    );
};

export default Login;
