import axios from "axios";
import { returnErrors } from "./errorActions";
import { clearErrors } from "./errorActions";

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    LOGOUT_SUCESS,
    REGISTER_SUCESS,
    REGISTER_FAIL,
} from "../actions/types";

//Check Token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then((res) => {
            dispatch({ type: USER_LOADED, payload: res.data });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR });
        });
};

//Config Headers
export const tokenConfig = (getState) => {
    //Get token from local storage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
};

//Register User

export const register = ({ handle, email, password }) => (dispatch) => {
    //Headers

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    //Request body
    const body = JSON.stringify({ handle, email, password });

    axios
        .post("/api/users", body, config)
        .then((res) =>
            dispatch({
                type: REGISTER_SUCESS,
                payload: res.data,
            })
        )
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "Register Failed"
                )
            );
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

//Login

export const login = ({ email, password }) => (dispatch) => {
    //Headers

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    //Request body
    const body = JSON.stringify({ email, password });

    axios
        .post("/api/auth", body, config)
        .then((res) =>
            dispatch({
                type: LOGIN_SUCESS,
                payload: res.data,
            })
        )
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "Login Failed"
                )
            );
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

//Logout

export const logout = () => {
    return {
        type: LOGOUT_SUCESS,
    };
};
