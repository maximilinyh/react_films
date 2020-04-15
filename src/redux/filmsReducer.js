import {FETCH_FILMS} from './types'

const initialState = {
    films: [],
}


const filmsReducer = (state=initialState, action)=> {
    switch (action.type) {
        case FETCH_FILMS:
            return {...state, films: action.payload.Episodes}
        default: return state;
    }
}

export default filmsReducer
