import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import "./css/bootstrap.min.css";
import "./css/globals.css";
import Home from "./home";
import SignUp from "./signup";
import Login from "./login";
import Dashboard from "./dashboard";
import PageNotFound from "./pagenotfound";
import { authenticateUser, createUser } from "./firebase";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/signup" element={<SignUp onSubmit={createUser} />} />
            <Route
                path="/login"
                element={<Login onSubmit={authenticateUser} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}
export default App;
