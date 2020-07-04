import axios from "axios";
import { tokenConfig } from "./authActions";
import { GET_RANK } from "../actions/types";

export const getRank = () => (dispatch, getState) => {
    axios.get("/api/auth/rank", tokenConfig(getState)).then((res) => {
        dispatch({ type: GET_RANK, payload: res.data });
    });
};
