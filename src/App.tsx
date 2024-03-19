import { Routes, Route } from "react-router-dom";
import "./css/bootstrap.min.css";
import "./css/globals.css";
import Home from "./components/home";
import SignUp from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import PageNotFound from "./components/pagenotfound";
import { createUser } from "./db";
import { authenticateUser } from "./auth"

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
