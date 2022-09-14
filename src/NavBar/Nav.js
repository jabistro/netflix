import "./Nav.css";
import React, { useEffect, useState } from 'react'

const Nav = () => {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", handleShow);
        };
    }, []);

    return (
        <div className={`nav-wrap ${show && "nav-wrap-black"}`}>
            <img
                className="nav-logo"
                src={require("../images/logo.png")}
                alt="Netflix Logo"
            />
            <img
                className="nav-avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Netflix-avatar.png/640px-Netflix-avatar.png"
                alt="Netflix Avatar"
            />
        </div>
    )
};

export default Nav
