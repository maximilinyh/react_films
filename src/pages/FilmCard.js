import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {Lines} from "react-preloaders";

const FilmCard = ({name, director, date, characters})=> {
    //initial state component
    const [data, setData] = useState([]);
    const [isLoaded, setiIsLoaded] = useState(false);
    const [error, setError] = useState(null)

    //useLocation
    const location = useLocation();

    //useParams
    let { id } = useParams();

    console.log(useParams())

    //data query
    useEffect(()=> {
        //fetch characters urls
        let charactersUrl = characters.map((url)=> {
            return fetch(url);
        })
        Promise.all(charactersUrl)
            .then((responses) => {
                return Promise.all(responses.map((result) => {
                     return result.json()
            }))
        } )
            //setState data
            .then((values) => {
                setiIsLoaded(true)
                setData(values)
            },

                //catch error
                (error)=> {
                    setiIsLoaded(true)
                    setError(true)
                });

    }, [characters])


    //render error
    if (error) {
        return <div>Error: {error.message}</div>;

        //render preloader
    } else if (!isLoaded) {
        return  <Lines background="#f7f7f7" />;
    }


    //render component
    else {
        return(
            <>
                <div className="col-4">
                    <img className='w-100' src="https://via.placeholder.com/300x600?text=300x600+Half+Page+AdC/O https://placeholder.com/banner-ads/" alt="Изображение фильма"/>
                </div>
                <div className="col-8">
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <th scope="row">Название фильма</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Имя режисера</th>
                            <td>{director}</td>
                        </tr>
                        <tr>
                            <th scope="row">Дата выпуска</th>
                            <td>{date}</td>
                        </tr>

                        <tr>
                            <th scope="row">Персонажи</th>
                            <td>
                                <ul>
                                    {data.map((el, index)=> {
                                        //add id
                                        el.id = index + 1;
                                        return <li key={el.id}><Link to={`${location.pathname}/test`}>{el.name}</Link></li>
                                    })}
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default FilmCard;
