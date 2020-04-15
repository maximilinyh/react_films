import {FETCH_FILMCARD} from "./types";

const initialState = {
    filmCard: []
}

const filmCardReducer = (state=initialState, action)=> {
    switch (action.type) {
        case FETCH_FILMCARD:
            return {...state, filmCard: action.payload}
        default: return state;
    }
}

export default filmCardReducer
