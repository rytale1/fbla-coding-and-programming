import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
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
import { redirect } from "react-router-dom";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
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
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "300px",
                        padding: "20px",
                    }}
                >
                    <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
                </Paper>
            </Box>
        </Layout>
    );
};

export default Dashboard;
