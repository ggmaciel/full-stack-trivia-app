import {
    GET_GAME,
    UPDATE_POINTS,
    CLEAR_GAME,
    CLEAR_POINTS,
} from "../actions/types";

const initialState = {
    triviaGame: null,
    playing: false,
    points: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GAME:
            return {
                ...state,
                playing: true,
                triviaGame: action.payload,
            };
        case CLEAR_GAME:
            return {
                ...state,
                playing: false,
                triviaGame: null,
            };
        case UPDATE_POINTS:
            return {
                ...state,
                points: action.payload,
            };
        case CLEAR_POINTS:
            return {
                ...state,
                points: 0,
            };
        default:
            return state;
    }
}
