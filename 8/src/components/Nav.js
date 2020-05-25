import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { hot } from "react-hot-loader";
import Cookies from "js-cookie";
import "./Nav.css";

function Nav(props) {
    let username = props.username;

    let handleLogout = (e) => {
        e.preventDefault();

        Cookies.remove("username");
        props.history.push("/");

        props.onLogout(e);
    };

    return (
        <div className="Nav d-flex justify-content-between">
            {username ? (
                <>
                    <span>{username}</span>
                    <a href="" onClick={handleLogout}>
                        Log out
                    </a>
                </>
            ) : (
                <span>You are not logged in</span>
            )}
        </div>
    );
}

export default hot(module)(withRouter(Nav));
