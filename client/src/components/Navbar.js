import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const element = <FontAwesomeIcon icon={faGithub} />;
    const logo = <FontAwesomeIcon icon={faBook} />;

    const history = useHistory();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const onLogout = () => {
        dispatch(logout());
        history.push("/");
    };

    const onDashboard = () => {
        history.push("/dashboard");
        window.location.reload();
    };

    const onRanking = () => {
        history.push("/ranking");
        window.location.reload();
    };

    return (
        <div className="navbar">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="trivia-icon">{logo}</span>
            </Link>
            <span className="git-icon">{element}</span>
            {isAuthenticated ? (
                <div>
                    <button className="navbar-btn" onClick={onDashboard}>
                        Dashboard
                    </button>
                    <button className="navbar-btn" onClick={onRanking}>
                        Ranking
                    </button>
                    <button className="navbar-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
