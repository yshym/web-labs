import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm.js";
import Dashboard from "./Dashboard.js";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: "yevhen",
                    password: "yevhen",
                },
            ],
            username: null,
        };
    }

    componentDidMount() {
        this.setUsernameFromCookies();
    }

    setUsernameFromCookies() {
        this.setState({ username: Cookies.get("username") });
    }

    handleLogout() {
        Cookies.remove("username");
    }

    render() {
        let username = this.state.username;

        return (
            <Router>
                <div className="d-flex justify-content-between">
                    {username ? (
                        <>
                            <span>{username}</span>
                            <a href="" onClick={this.handleLogout}>
                                Log out
                            </a>
                        </>
                    ) : (
                        <span>You are not logged in</span>
                    )}
                </div>
                <hr />

                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/">
                        <LoginForm
                            users={this.state.users}
                            onSubmit={() => this.setUsernameFromCookies()}
                        />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default hot(module)(App);
