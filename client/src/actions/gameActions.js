import {
    GET_GAME,
    UPDATE_POINTS,
    CLEAR_GAME,
    CLEAR_POINTS,
} from "../actions/types";
import { tokenConfig } from "./authActions";
import axios from "axios";

export const getGame = (game) => {
    return {
        type: GET_GAME,
        payload: game,
    };
};

export const clearGame = () => {
    return {
        type: CLEAR_GAME,
    };
};

export const updatePoints = (points) => (dispatch) => {
    dispatch({ type: UPDATE_POINTS, payload: points });
};

export const clearPoints = () => (dispatch) => {
    dispatch({ type: CLEAR_POINTS });
};

export const newPoints = (updatedPoints) => (dispatch, getState) => {
    const body = {
        updatePoints: updatedPoints,
    };

    axios
        .put("/api/auth/update", body, tokenConfig(getState))
        .then((res) => {});
};

export const updateMatches = ({
    category,
    points,
    difficulty,
    questionQuantity,
}) => (dispatch, getState) => {
    //Request body
    const body = {
        category: category,
        points: points,
        difficulty: difficulty,
        questionQuantity: questionQuantity,
    };

    axios
        .put("/api/auth/matches", body, tokenConfig(getState))
        .then((res) => {});
};
