import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authorized = useSelector((state) => state.auth.isAuthenticated);
    const playing = useSelector((state) => state.game.playing);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (authorized && playing) {
                    return <Component {...props} />;
                } else if (authorized == false || playing == false) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;
