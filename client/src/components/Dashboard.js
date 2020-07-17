import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from "../actions/gameActions";
import { clearPoints } from "../actions/gameActions";
import { newPoints } from "../actions/gameActions";

import { useHistory } from "react-router-dom";

export default function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [gameCategories, setGameCategories] = useState();
    const [amount, setAmount] = useState(5);
    const [difficulty, setDifficulty] = useState("easy");
    const [start, setStart] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [seeMatches, setSeeMatches] = useState(false);
    const element = <FontAwesomeIcon icon={faTimes} />;
    const dispatch = useDispatch();
    const triviaGame = useSelector((state) => state.game.triviaGame);
    const user = useSelector((state) => state.auth.user);
    const points = useSelector((state) => state.game.points);
    const history = useHistory();

    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php").then((res) => {
            setCategories(res.data.trivia_categories);
        });
        dispatch(newPoints(points));
    }, []);

    let matches;
    let lastMatches;

    if (loader && user) {
        matches = user.matches.slice(-3);
        lastMatches = matches.map((data) => {
            return (
                <div key={data.Date} className="matches">
                    <h3>{data.Category}</h3>
                    <h3>{data.Difficulty}</h3>
                    <h3>{`Right Answers: ${data.Points}`}</h3>
                    <h3>{`Questions: ${data.Questions}`}</h3>
                </div>
            );
        });
    }

    useEffect(() => {
        if (gameCategories && difficulty && amount) {
            axios
                .get(
                    `https://opentdb.com/api.php?amount=${amount}&category=${gameCategories}&difficulty=${difficulty}`
                )
                .then((res) => {
                    const game = res.data.results;
                    dispatch(getGame(game));
                });
        }
    }, [gameCategories, difficulty, amount]);

    const onCategory = () => {
        setGameCategories(document.getElementById("select_id").value);
    };

    const onDifficulty = () => {
        setDifficulty(document.getElementById("select_id2").value);
    };

    const onAmount = (e) => {
        setAmount(e.target.value);
    };

    const onStart = () => {
        setStart(!start);
    };

    const onSeeMatches = () => {
        setSeeMatches(!seeMatches);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (triviaGame == null) {
            setError(true);
        } else {
            history.push("/triviamatch");
            setError(false);
        }
    };

    var timeout = setTimeout(() => {
        setLoader(true);
        dispatch(clearPoints());
        clearTimeout(timeout);
    }, 3000);

    return (
        <div>
            {loader == false ? (
                <div className="spinner-1"></div>
            ) : (
                <div className="dashboard-container">
                    <div className="col-1">
                        <div className="col-user">
                            <div className="dashboard-header">
                                <h1>{user ? user.handle : ""}</h1>
                                <h3 className="points">
                                    {user ? user.points + " Points" : ""}
                                </h3>
                            </div>
                            <div>
                                {seeMatches ? (
                                    <div className="last-matches">
                                        <button
                                            className="register-btn"
                                            onClick={onSeeMatches}
                                            style={{
                                                fontSize: "10pt",
                                                background: " rgb(48, 75, 117)",
                                            }}
                                        >
                                            X
                                        </button>
                                        {lastMatches}
                                    </div>
                                ) : (
                                    <button
                                        className="register-btn"
                                        onClick={onSeeMatches}
                                        style={{
                                            fontSize: "10pt",
                                            background: " rgb(73, 135, 216)",
                                        }}
                                    >
                                        Last Matches
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {start ? (
                        <div className="col-2">
                            <button
                                className="x-btn"
                                onClick={onStart}
                                style={{
                                    fontSize: "15pt",
                                    background: " rgb(48, 75, 117)",
                                }}
                            >
                                {element}
                            </button>
                            <form className="game-form" onSubmit={onSubmit}>
                                <label>
                                    <h3>Category</h3>
                                </label>
                                <select onChange={onCategory} id="select_id">
                                    <option />
                                    {categories.map((category) => {
                                        return (
                                            <option
                                                value={category.id}
                                                key={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <label htmlFor="amount">
                                    <h3>Amount of Questions</h3>
                                </label>
                                <input
                                    type="amount"
                                    id="amount"
                                    min="1"
                                    max="50"
                                    defaultValue="5"
                                    onChange={onAmount}
                                ></input>
                                <label>
                                    <h3>Difficulty</h3>
                                </label>
                                <select onChange={onDifficulty} id="select_id2">
                                    <option />
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                                <h3>{error ? "Choose a category" : ""}</h3>
                                <button
                                    className="register-btn"
                                    style={{
                                        fontSize: "15pt",
                                        background: " rgb(48, 75, 117)",
                                    }}
                                >
                                    Start
                                </button>
                            </form>
                        </div>
                    ) : (
                        <button
                            className="dashboard-play-btn"
                            onClick={onStart}
                        >
                            Play
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
