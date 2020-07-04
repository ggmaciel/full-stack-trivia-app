import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { useHistory } from "react-router-dom";

export default function Register() {
    const [handle, setHandle] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordError, setPasswordError] = useState(false);
    const error = useSelector((state) => state.error);
    const authorized = useSelector((state) => state.auth.isAuthenticated);
    const history = useHistory();

    useEffect(() => {
        if (authorized) {
            history.push("/dashboard");
            window.location.reload();
        }
    }, [authorized]);

    const dispatch = useDispatch();

    const onChangeHandle = (e) => {
        setHandle(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);

            const newUser = {
                handle,
                email,
                password,
            };
            //Attempt to register
            dispatch(register(newUser));
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={onSubmit} className="register-form">
                <label>
                    <h3>Username</h3>
                </label>
                <input
                    type="text"
                    name="handle"
                    id="handle"
                    placeholder="Username"
                    onChange={onChangeHandle}
                />

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
                {passwordError ? "Password must match" : ""}
                <label>
                    <h3>Confirm Password</h3>
                </label>
                <input
                    type="password"
                    name="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={onChangeConfirmPassword}
                />
                <button className="register-btn">Register</button>
                <h3>
                    {error.message.message == "User already exists"
                        ? error.message.message
                        : ""}
                </h3>
                <h3>
                    {error.message.message == "Please enter all fields"
                        ? error.message.message
                        : ""}
                </h3>
            </form>
        </div>
    );
}
