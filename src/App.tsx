import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import "./css/bootstrap.min.css";
import "./css/globals.css";
import Home from "./home";

export function App() {
    return (
        <div className="wsmenucontainer">
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/signup" element={<Signup />} />*/}
                {/*<Route path="/login" element={<login />} />*/}
            </Routes>
        </div>
    );
}
export default App;
