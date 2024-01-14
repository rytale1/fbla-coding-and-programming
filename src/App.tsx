import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import "./css/bootstrap.min.css";
import "./css/globals.css";
import Home from "./home";
import SignUp from "./signup";
import Login from "./login";

export function App() {
    return (
        <div className="wsmenucontainer">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp onSubmit={function (username: string, password: string): void {
                    throw new Error("Function not implemented.");
                } } />} />
                <Route path="/login" element={<Login onSubmit={function (username: string, password: string): void {
                    throw new Error("Function not implemented.");
                } } />} />
            </Routes>
        </div>
    );
}
export default App;
