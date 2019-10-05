import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App.tsx";

import axios from 'axios';

//redux
import { Provider } from 'react-redux';
import { store } from './Redux/store';

axios.defaults.baseURL = 'http://localhost:5000'

const app = <Provider store={store}>
    <App />
</Provider>


ReactDOM.render(app, document.getElementById("root"));
