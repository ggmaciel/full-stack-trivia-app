import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
    const authorized = useSelector((state) => state.auth.isAuthenticated);

    const history = useHistory();

    const onLogin = () => {
        history.push("/login");
    };

    const onRegister = () => {
        history.push("/register");
    };

    return (
        <div className="homepage-bg">
            <img src="images/image2.png" />
            {authorized ? (
                ""
            ) : (
                <div className="btn-container">
                    <button className="home-login-btn" onClick={onLogin}>
                        <h1>Login</h1>
                    </button>
                    <button className="home-register-btn" onClick={onRegister}>
                        <h1>Register</h1>
                    </button>
                </div>
            )}
        </div>
    );
}
