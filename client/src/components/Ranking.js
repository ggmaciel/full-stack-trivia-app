import React, { useEffect, useState } from "react";
import { getRank } from "../actions/rankActions";
import { useDispatch, useSelector } from "react-redux";

export default function Ranking() {
    const [playerRank, setPlayerRank] = useState();
    const [loader, setLoader] = useState(false);
    const rank = useSelector((state) => state.rank);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRank());
    }, []);

    setTimeout(() => {
        setPlayerRank(
            rank.players.map((player, index) => {
                return (
                    <div
                        key={index}
                        className={index % 2 == 0 ? "ranking-1" : "ranking-2"}
                    >
                        <h1>{player.handle}</h1>
                        <h1>{player.matches.length}</h1>
                        <h1>{player.points}</h1>
                    </div>
                );
            })
        );
    }, 1000);

    var timeout = setTimeout(() => {
        setLoader(true);
        clearTimeout(timeout);
    }, 1000);

    return (
        <div>
            {loader == false ? (
                <div className="spinner-2"></div>
            ) : (
                <div className="ranking-container">
                    <div className="ranking">
                        <h3>Username</h3>
                        <h3>Matches Played</h3>
                        <h3 className="ranking-points">Points</h3>
                    </div>
                    {playerRank ? playerRank : ""}
                </div>
            )}
        </div>
    );
}
