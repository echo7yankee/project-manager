import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App.tsx";

import jwt from 'jsonwebtoken'

import axios from 'axios';

//redux
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { SET_AUTHENTICATED } from "./Redux/types";
import { logoutUser } from "./Redux/actions/auth";

axios.defaults.baseURL = 'http://localhost:5000'

const token = localStorage.FBIdToken;


if (token) {
    const decodedToken = jwt.decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        store.dispatch(logoutUser());
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common.Authorization = token;
    }
}

const app = <Provider store={store}>
    <App />
</Provider>


ReactDOM.render(app, document.getElementById("root"));
