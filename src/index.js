import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

//=============================
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, Redirect } from "react-router-dom"
import { createBrowserHistory } from "history";

//=============================
import { syncHistoryWithStore } from 'react-router-redux';
import {rootReducer} from './redux/rootReducer'
import FilmCard from "./components/FilmCard";


//=============================
const customHistory = createBrowserHistory();
const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
const history = syncHistoryWithStore(customHistory, store);


//=============================
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Redirect  from='/' to='/films' />
            <Route exact path="/films" component={App}/>
            <Route path="/films/:id" component={FilmCard}/>
        </Router>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
