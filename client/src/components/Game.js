import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearGame } from "../actions/gameActions";
import { updatePoints } from "../actions/gameActions";
import { updateMatches } from "../actions/gameActions";

export default function Game() {
    const triviaGame = useSelector((state) => state.game.triviaGame);
    const history = useHistory();
    const [counter, setCounter] = useState(0);
    const [reload, setReload] = useState(true);
    const [points, setPoints] = useState(0);
    const dispatch = useDispatch();

    var sec = 10;

    var timer = setInterval(function () {
        document.getElementById("timer").innerHTML = sec;
        sec--;
        if (sec == -1) {
            clearInterval(timer);
        }
    }, 890);

    var timeout = setTimeout(() => {
        setCounter(counter + 1);
    }, 10000);

    useEffect(() => {
        if (counter == game.length) {
            dispatch(updatePoints(points));
            const matches = {
                category: triviaGame[0].category,
                points: points,
                difficulty: triviaGame[0].difficulty,
                questionQuantity: triviaGame.length,
            };
            dispatch(updateMatches(matches));
            dispatch(clearGame());
            clearInterval(timer);
            clearTimeout(timeout);
            history.push("/dashboard");
        }
    }, [counter, reload]);

    history.listen((location, action) => {
        if (location.pathname != "/triviamatch") {
            clearTimeout(timeout);
            clearInterval(timer);
            dispatch(clearGame());
            window.location.reload();
        }
    });

    const game = triviaGame.map((res, index) => {
        const decodeString = (str) => {
            const textArea = document.createElement("textarea");
            textArea.innerHTML = str;
            return textArea.value;
        };
        const options = [...res.incorrect_answers, res.correct_answer];
        const sortedOptions = options.sort(() => Math.random() - 0.5);
        const answer = sortedOptions.map((answers) => {
            return (
                <button
                    id={res.correct_answer == answers ? "answer" : ""}
                    key={Math.random().toString(16).slice(2)}
                    className={`${
                        res.correct_answer == answers
                            ? "answer-btn"
                            : "register-btn"
                    }`}
                    onClick={() =>
                        res.correct_answer == answers
                            ? (clearTimeout(timeout),
                              clearInterval(timer),
                              setReload(!reload),
                              setCounter(counter + 1),
                              setPoints(points + 1))
                            : (clearTimeout(timeout),
                              clearInterval(timer),
                              setReload(!reload),
                              setCounter(counter + 1))
                    }
                >
                    {decodeString(answers)}
                </button>
            );
        });

        return (
            <div key={Math.random().toString(16).slice(2)}>
                <div className="question-container">
                    <h1>{decodeString(res.question)}</h1>
                </div>
                {answer}
            </div>
        );
    });

    return (
        <div className="game-block">
            <div className="loading-bar">
                <h1>Right Answers: {points}</h1>
                <h1>
                    <span id="timer">10</span>
                </h1>
            </div>
            <div className="game-container">{game[counter]}</div>
        </div>
    );
}
