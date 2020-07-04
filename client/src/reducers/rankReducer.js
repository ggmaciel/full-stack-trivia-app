import { GET_RANK } from "../actions/types";

const initialState = {
    players: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RANK:
            return {
                players: action.payload,
            };
        default:
            return state;
    }
}
