import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { MouseEventHandler, useEffect, useState } from "react";
import Button from "@mui/material/Button";

const Header = ({
    headerBtn,
    hideHeader,
}: {
    headerBtn: boolean;
    hideHeader?: boolean;
}) => {
    const [openSubMen, setOpenSubMen] = useState<string | null>(null);
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

    const signUp = () => {
        navigate("/signup");
    };

    useEffect(() => {
        setCurrentLocation(location);
    }, [location]);

    return hideHeader ? (
        <div></div>
    ) : (
        <header id="header" className="white-menu navbar-dark">
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
                                <li onClick={() => activeFun("About")}>
                                    <span
                                        className={`wsmenu-click ${iconChange(
                                            "About"
                                        )}`}
                                    >
                                        <i className="wsmenu-arrow" />
                                    </span>
                                    <a href="#">
                                        hello
                                        <span className="wsarrow" />
                                    </a>
                                    <ul
                                        className={`sub-menu ${activeLi(
                                            "About"
                                        )}`}
                                    >
                                        <li>
                                            <Link to="/">khjlh</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li onClick={() => activeFun("Tools")}>
                                    <span
                                        className={`wsmenu-click ${iconChange(
                                            "Tools"
                                        )}`}
                                    >
                                        <i className="wsmenu-arrow" />
                                    </span>
                                    <a href="#">
                                        Tools <span className="wsarrow" />
                                    </a>
                                    <ul
                                        className={`sub-menu ${activeLi(
                                            "Tools"
                                        )}`}
                                    >
                                        <li>
                                            <Link to={"/"}>bobby</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nl-simple">
                                    <Link to="/login?type=login">Login</Link>
                                </li>
                                <li>
                                    <div
                                        style={{
                                            alignItems: "center",
                                            alignSelf: "center",
                                        }}
                                    >
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
                                                backgroundColor: "primary.main",
                                                textTransform: "none",
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                </li>
                                {/* DROPDOWN MENU 
                <li onClick={() => activeFun("En")}>
                  <span className={`wsmenu-click ${iconChange("En")}`}>
                    <i className="wsmenu-arrow" />
                  </span>
                  <a href="#" className="lang-select">
                    <img src="/images/icons/flags/uk.png" alt="flag-icon" /> En{" "}
                    <span className="wsarrow" />
                  </a>
                  <ul className={`sub-menu last-sub-menu ${activeLi("En")}`}>
                    <li>
                      <a href="#">
                        <img
                          src="/images/icons/flags/germany.png"
                          alt="flag-icon"
                        />{" "}
                        Deutch
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="/images/icons/flags/spain.png"
                          alt="flag-icon"
                        />{" "}
                        Español
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="/images/icons/flags/france.png"
                          alt="flag-icon"
                        />{" "}
                        Français
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="/images/icons/flags/italy.png"
                          alt="flag-icon"
                        />{" "}
                        Italiano
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="/images/icons/flags/russia.png"
                          alt="flag-icon"
                        />{" "}
                        Русский
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="/images/icons/flags/china.png"
                          alt="flag-icon"
                        />{" "}
                        简体中文
                      </a>
                    </li>
                  </ul>
              </li>*/}{" "}
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
