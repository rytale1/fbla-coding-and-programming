import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
} from "@mui/material";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { logout } from "../auth";

const Header = ({
    headerBtn,
    hideHeader,
}: {
    headerBtn: boolean;
    hideHeader?: boolean;
}) => {
    const [openSubMen, setOpenSubMen] = useState<string | null>(null);

    // Check if user is signed in or out
    const onClick = () => {
        const body = document.querySelector("body");
        body?.classList.toggle("wsactive");
        setOpenSubMen("");
    };
    const activeFun = (name: string | null) =>
        setOpenSubMen(name === openSubMen ? "" : name);
    const activeLi = (name: string | null) =>
        name === openSubMen ? "d-block" : "d-md-block d-sm-none";
    const iconChange = (name: string | null) =>
        name === openSubMen ? "ws-activearrow" : "";
    const navigate = useNavigate();

    const location = useLocation();
    const [, setCurrentLocation] = useState(location);
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const linkRef = React.useRef<HTMLAnchorElement | null>(null);
    const signUp = () => {
        navigate("/signup");
    };
    const auth = useRef(getAuth());

    useEffect(() => {
        onAuthStateChanged(auth.current, (user) => {
            if (user) {
                // User is signed in.
                setAuthUser(user);
                console.log("User is logged in:", user);
            } else {
                // No user is signed in.
                setAuthUser(null);
                console.log("No user is logged in.");
            }
        });

        setCurrentLocation(location);
    }, [location, auth]);

    const logoutAndSendHome = () => {
        logout();
        window.location.href = "/";
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return hideHeader ? (
        <div></div>
    ) : (
        <header id="header" className="white-menu navbar-dark">
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                style={{ width: "1500px" }}
            >
                <DialogTitle style={{ fontSize: "36px" }}>
                    Contact Us
                </DialogTitle>
                <DialogContent
                    style={{
                        width: "500px",
                        height: "300px",
                        padding: "20px",
                        marginTop: "-40px",
                    }}
                >
                    <form
                        noValidate
                        autoComplete="off"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div>
                            <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                                <strong>Contact Us</strong>
                                <br />
                                <span style={{ color: "#666" }}>
                                    Have questions or need assistance? Reach out
                                    to us via email or phone, or use our help
                                    and feedback form below.
                                </span>
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <p style={{ margin: "0", color: "#333" }}>
                                <strong>Email:</strong> talus123@careerbase.org
                            </p>
                            <p style={{ margin: "0", color: "#333" }}>
                                <strong>Phone:</strong> +1 (669) 290-3192
                            </p>
                        </div>
                        <div>
                            <Link
                                to={"https://www.youtube.com"}
                                style={{
                                    textDecoration: "none",
                                    color: "#3f51b5",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                Help and Feedback Form
                            </Link>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="header-wrapper">
                {/* MOBILE HEADER */}
                <div className="wsmobileheader clearfix">
                    <a
                        href="#"
                        onClick={() => onClick()}
                        id="wsnavtoggle"
                        aria-label="Toggle Menu"
                        className="wsanimated-arrow"
                    >
                        <span />
                    </a>
                    <Link to={"/"} className="logo-black">
                        <span className="smllogo smllogo-black">
                            <img
                                src="/images/logo.png"
                                width={200}
                                height={44}
                                alt="mobile-logo"
                            />
                        </span>
                    </Link>
                    <span className="smllogo smllogo-white">
                        <img
                            src="/images/logo.png"
                            width={200}
                            height={44}
                            alt="mobile-logo"
                        />
                    </span>
                </div>
                {/* NAVIGATION MENU */}
                <div className="wsmainfull menu clearfix" id="wsmainfull">
                    <div className="wsmainwp clearfix">
                        {/* LOGO IMAGE */}
                        {/* For Retina Ready displays take a image with double the amount of pixels that your image will be displayed (e.g 344 x 80 pixels) */}
                        <div className="desktoplogo">
                            <Link to={"/"} className="logo-black">
                                <img
                                    width={300}
                                    height={50}
                                    src="/images/logo.png"
                                    alt="header-logo"
                                />
                            </Link>
                        </div>
                        <div className="desktoplogo">
                            <a href={"/"} className="logo-white">
                                <img
                                    src="/images/logo.png"
                                    width={300}
                                    height={50}
                                    alt="header-logo"
                                />
                            </a>
                        </div>
                        {/* MAIN MENU */}
                        {headerBtn ? "" : ""}
                        <nav
                            className="wsmenu clearfix"
                            style={{ maxHeight: "100%" }}
                        >
                            <div
                                className="overlapblackbg"
                                onClick={() => onClick()}
                            />
                            <ul className="wsmenu-list">
                                {/* DROPDOWN MENU */}
                                {authUser !== null && (
                                    <li className="nl-simple">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                )}
                                <li className="nl-simple">
                                    {authUser === null ? (
                                        <Link to="/login?type=login">
                                            Sign In
                                        </Link>
                                    ) : (
                                        <a href="#" onClick={logoutAndSendHome}>
                                            Sign Out
                                        </a>
                                    )}
                                </li>
                                <li className="nl-simple">
                                    <Link to="" onClick={handleOpenDialog}>
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <div
                                        style={{
                                            alignItems: "center",
                                            alignSelf: "center",
                                        }}
                                    >
                                        {authUser === null && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={signUp}
                                                sx={{
                                                    marginTop: "15px",
                                                    marginLeft: "15px",
                                                    textAlign: "center",
                                                    width: 120,
                                                    height: 40,
                                                    fontSize: "18px",
                                                    backgroundColor:
                                                        "primary.main",
                                                    textTransform: "none",
                                                }}
                                            >
                                                Sign Up
                                            </Button>
                                        )}
                                    </div>
                                </li>{" "}
                                {/* END DROPDOWN MENU */}
                            </ul>
                        </nav>

                        {/* END MAIN MENU */}
                    </div>
                </div>
                {/* END NAVIGATION MENU */}
            </div>
            {/* End header-wrapper */}
        </header>
    );
};

export default Header;
