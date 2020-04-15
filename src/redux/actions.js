import {FETCH_FILMS, SHOW_LOADER, HIDE_LOADER, FETCH_FILMCARD} from "./types";

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}



export function fetchFilms() {
    return async(dispatch)=> {
        const url = 'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2';

        dispatch(showLoader())
        const response = await fetch(url);
        const json = await response.json();

        dispatch({type: FETCH_FILMS, payload: json})
        dispatch(hideLoader())
    }
}

export function fetchFilmCard() {
        return async (dispatch)=> {
            const urls = [
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=1',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=2',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=3',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=4',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=5',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=6',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=7',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=8',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=9',
                'http://www.omdbapi.com/?apikey=1664147c&t=Game%20of%20Thrones&Season=2&Episode=10'
            ];

            dispatch(showLoader())

            Promise.all(urls.map((url)=> {
                return fetch(url).then((response)=> {
                    return response.json()
                })
            })).then((result)=> {
                dispatch({type: FETCH_FILMCARD, payload: result})
            })

            dispatch(hideLoader())
        }
}
