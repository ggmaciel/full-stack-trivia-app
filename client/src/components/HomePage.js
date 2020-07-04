import React from "react";
import { useHistory } from "react-router-dom";

export default function HomePage() {
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
            <div className="btn-container">
                <button className="register-btn" onClick={onLogin}>
                    <h1>Login</h1>
                </button>
                <button className="register-btn" onClick={onRegister}>
                    <h1>Register</h1>
                </button>
            </div>
        </div>
    );
}
