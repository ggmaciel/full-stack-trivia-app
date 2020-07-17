import React, { useState, useEffect } from "react";
import { login } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const error = useSelector((state) => state.error);
    const authorized = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (authorized) {
            history.push("/dashboard");
            window.location.reload();
        }
    }, [authorized]);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        //Attempt to login
        dispatch(login(user));
    };

    return (
        <div className="login-container">
            <form onSubmit={onSubmit} className="login-form">
                <label>
                    <h3>Email</h3>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={onChangeEmail}
                />

                <label>
                    <h3>Password</h3>
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={onChangePassword}
                />
                <h3>
                    {error.message.message == "Please enter all fields"
                        ? "Please enter all fields"
                        : ""}
                </h3>
                <h3>
                    {error.message.message == "User does not exists"
                        ? "User does not exists"
                        : ""}
                </h3>
                <h3>
                    {error.message.message == "Invalid credentials"
                        ? "Invalid Credentials"
                        : ""}
                </h3>
                <button className="login-btn">Login</button>
            </form>
        </div>
    );
}
