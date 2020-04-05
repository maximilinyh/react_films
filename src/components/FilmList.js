import React, {Component } from 'react';
import '../App.scss';
import FilmItem from "./FilmItem";
import FilmCard from "../pages/FilmCard";
import PropTypes from "prop-types";
import { Lines } from 'react-preloaders';
import {Switch, Route, withRouter, Redirect} from "react-router-dom";

class FilmList extends Component {
    constructor(props) {
        super(props);

        //state init
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    abortController = new AbortController();

    componentDidMount() {
        //get url
        const url = 'https://swapi.co/api/films/?format=json';

        //data query
        fetch(url, {signal:this.abortController.signal})
            .then((response)=> {
                return response.json()
            })
            .then((result)=> {
                this.setState({
                    isLoaded: true,
                    items: result.results
                })
            },
                //catch error
                (error)=> {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentWillUnmount() {
        this.abortController.abort();
    }


    render() {
        //state component
        const { error, isLoaded, items } = this.state;

        // props component
        const { match, location, history} = this.props;

        //base dir
        const baseDir = match.url;

        // filmList
        const filmList = items.map((item, index)=> {
            //add id
            item.id = index + 1;
                return <FilmItem
                    name={item.title}
                    episodId = {item.episode_id}
                    date={item.release_date}
                    key={item.id}
                    id={item.id}
                    link={`${location.pathname}/${item.title.replace(/ /g, '-')}-id_${item.id}`}
                />
            })

        console.log(items)
        const i = Number(location.pathname.toString().slice(-1));

        //render error
        if (error) {
            return <div>Error: {error.message}</div>;

            //render preloader
        } else if (!isLoaded) {
            return  <Lines customLoading={isLoaded}  time={0} background="#f7f7f7" />;
        }

        //render FilmList
        else {
            return (
                    <Switch>
                        {/*redirect base directory*/}
                        <Redirect exact from={`${baseDir}`} to='/films' />
                        <Route exact path='/films'>
                            {/*render film list*/}
                            <div className="films">
                                <div className="row">
                                    {filmList}
                                </div>
                            </div>
                        </Route>
                        <Route path="/films/:id">
                            {/*render film card*/}
                            <div className="films-card">
                                {/*button back*/}
                                <button className='btn btn-link' onClick={history.goBack}>Back</button>
                                <div className="row">

                                    {/*<FilmCard/>*/}
                                    {
                                        !isNaN(i) ?  <FilmCard
                                            name={`Episode ${items[i-1].episode_id}: ${items[i-1].title}`}
                                            director={items[i-1].director}
                                            date={items[i-1].release_date}
                                            characters={items[i-1].characters}
                                            id={items[i-1].id}
                                        /> : null
                                    }
                                </div>
                            </div>
                        </Route>
                    </Switch>
            )

        }
    }

}

export default withRouter (FilmList);
