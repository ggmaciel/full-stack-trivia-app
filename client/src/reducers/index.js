import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import gameReducer from "./gameReducer";
import rankReducer from "./rankReducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    game: gameReducer,
    rank: rankReducer,
});
