import { useEffect } from "react";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Header from "./Header";
import React from "react";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const CustomFontTheme = createTheme({
    typography: {
        fontFamily: [
            "Poppins",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 11,
        button: {
            color: "#00ff00",
            fontSize: "0.7rem",
            fontWeight: 600, // Set your desired font size
        },
    },
});

const Layout = ({
    children,
    footer,
    headerBtn,
    darkMode,
    hideHeader,
}: {
    children: React.ReactNode | undefined;
    footer?: number | undefined;
    headerBtn: boolean;
    darkMode?: boolean;
    hideHeader?: boolean;
}) => {
    const aTagClick = () => {
        const aTag = document.querySelectorAll("[href='#']");
        for (let i = 0; i < aTag.length; i++) {
            const a = aTag[i];
            a.addEventListener("click", (e) => {
                e.preventDefault();
            });
        }
    };

    const stickNav = () => {
        let offset = window ? window.scrollY : 0;
        const sticky = document.querySelector("#wsmainfull");
        if (sticky) {
            if (offset > 80) {
                sticky.classList.add("scroll");
            } else {
                sticky.classList.remove("scroll");
            }
        }
    };

    useEffect(() => {
        aTagClick();
        if (window) {
            window.addEventListener("scroll", stickNav);
        }
    });
    return (
        <ThemeProvider theme={CustomFontTheme}>
            <div
                className="page"
                id="page"
                style={{ backgroundColor: darkMode ? "#000" : "#fff" }}
            >
                <Header headerBtn={headerBtn} hideHeader={hideHeader} />
                {children}
                {footer === 3 ? (
                    <Footer3 />
                ) : footer === 4 ? (
                    <Footer2 footer={4} />
                ) : (
                    <Footer2 footer={footer} />
                )}
            </div>
        </ThemeProvider>
    );
};

export default Layout;
