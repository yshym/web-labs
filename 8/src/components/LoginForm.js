import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { hot } from "react-hot-loader";
import Cookies from "js-cookie";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { valid: null };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData(e.target);
        let [username, password] = [data.get("username"), data.get("password")];

        if (
            this.props.users.some(
                (user) =>
                    user.username === username && user.password === password
            )
        ) {
            Cookies.set("username", username);
            this.props.onSubmit();
            this.props.history.push("/dashboard");
        } else {
            this.setState({ valid: false });
            return false;
        }
    };

    render() {
        let alert =
            this.state.valid === false ? (
                <div className="alert alert-danger" role="alert">
                    Wrong username or password
                </div>
            ) : null;

        return (
            <>
                {alert}
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Login</h3>
                    <br />

                    <div className="form-group">
                        <label htmlFor="login">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </>
        );
    }
}

export default hot(module)(withRouter(LoginForm));
