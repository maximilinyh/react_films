import {combineReducers} from "redux";
import { routerReducer} from 'react-router-redux';

import filmsReducer from "./filmsReducer";
import {appReducer} from "./appResducer";
import filmCardReducer from "./filmCardReducer";

export const rootReducer = combineReducers({
    routing: routerReducer,
    films: filmsReducer,
    filmCard: filmCardReducer,
    app: appReducer,
})

