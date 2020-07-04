import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Default from "./components/Default";
import Game from "./components/Game";
import Ranking from "./components/Ranking";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import PrivateRoute2 from "./ProtectedRoutes/PrivateRoute2";
import { loadUser } from "./actions/authActions";

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    });
    return (
        <Provider store={store}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/ranking" component={Ranking} />
                <PrivateRoute2 path="/triviamatch" component={Game} />
                <Route component={Default} />
            </Switch>
        </Provider>
    );
}

export default App;
