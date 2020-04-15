import React, {useEffect} from 'react';
import './App.scss';
import {Link} from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import {fetchFilms} from "./redux/actions";
import FilmItem from "./components/FilmItem";
import Preloader from "./components/Preloader";



function mapStateToProps(state) {
    const { films } = state;
    const {app} = state;
    return {
        filmsFetched: films.films,
        loading: app.loading
    }
}


const App = ({filmsFetched, loading, location}) => {
    //dispatch hook
    const dispatch = useDispatch();


    const filmsList = filmsFetched.map((film, index)=> {
        film.id = index + 1;
        return <FilmItem
            name={film.Title}
            episodId = {film.Episode}
            date={film.Released}
            key={film.id}
            id={film.id}
            link={`${location.pathname}/${film.imdbID}`}
        />
    })


    //fetch data
    useEffect(()=>{
        dispatch(fetchFilms());
    }, [dispatch])

    //render preloader
    if (loading) {
        return  <Preloader/>;
    }
    //render films list
    else {
        return (
            <div className="container mt-5">
                <div className="films">
                    <div className="row">{filmsList}</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, null) (App);


