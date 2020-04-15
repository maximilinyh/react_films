import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import Preloader from "./Preloader";
import {fetchFilmCard} from "../redux/actions";

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    const { filmCard, app } = state;
    const currentFilm = filmCard.filmCard.filter((film)=> {
        return film.imdbID === id
    })

    return {
        filmCardFetched: currentFilm[0],
        loading: app.loading,
    }
}


const FilmCard = ({filmCardFetched, loading, history})=> {
    const dispatch = useDispatch();
    console.log(filmCardFetched)
    //fetch data
    useEffect(()=>{
        dispatch(fetchFilmCard());

    }, [dispatch])



    //render preloader
    if (loading) {
        return  <Preloader/>;
    }
    //render films list
    else {
        return (
            <div className="container mt-5">
                <div className="films-card">
                    <div className="row">
                        <div className="col-4">
                            {/*button back*/}
                            <button className='btn btn-link' onClick={history.goBack}>Back</button>
                            <img className='w-100' src={filmCardFetched !== undefined ? filmCardFetched.Poster : null} alt="Изображение фильма"/>
                        </div>
                        <div className="col-8">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{filmCardFetched !== undefined ? filmCardFetched.Title : null}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Episode</th>
                                    <td>{filmCardFetched !== undefined ? filmCardFetched.Episode : null}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Season</th>
                                    <td>{filmCardFetched !== undefined ? filmCardFetched.Season : null}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Year</th>
                                    <td>{filmCardFetched !== undefined ? filmCardFetched.Year : null}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Genre</th>
                                    <td>{filmCardFetched !== undefined ? filmCardFetched.Genre : null}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Director</th>
                                    <td>{filmCardFetched !== undefined ? filmCardFetched.Director : null}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Released</th>
                                    <td>{filmCardFetched !== undefined ? filmCardFetched.Released : null}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Writer: </th>
                                    <td>
                                        {filmCardFetched !== undefined ? filmCardFetched.Writer : null}
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Actors</th>
                                    <td>
                                        {filmCardFetched !== undefined ? filmCardFetched.Actors : null}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, null)(FilmCard);
