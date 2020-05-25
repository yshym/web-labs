import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "./Nav.js";
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
        };
    }

    componentDidMount() {
        this.setUsernameFromCookies();
    }

    setUsernameFromCookies = () => {
        this.setState({ username: Cookies.get("username") });
    };

    handleLogout = () => {
        this.setState({ username: null });
    };

    render() {
        let username = this.state.username;

        return (
            <Router>
                <Nav username={username} onLogout={this.handleLogout} />
                <br/>

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
