import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "mobx-react";
import commonStore from "./stores/commonStore";
import applicationStore from "./stores/applicationStore";
import axios from 'axios';
const stores = {
    commonStore,
    applicationStore
};
axios.defaults.headers.common = {'Authorization': `Bearer ${commonStore.token}`};
ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById("root")
  );
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
