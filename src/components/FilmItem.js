import React from "react";
import '../App.scss';
import {Link} from "react-router-dom";


const FilmItem = ({name, date, link, episodId})=> {
    return(
        <div className=" films__item col-6 col-sm-4 col-md-3 mb-5 text-center">
            <div className="films__image mb-3">
                <Link to={link}>
                    <img className='mw-100' src='https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_SX300.jpg' alt={`Episode ${episodId}:${name}`}/>
                </Link>
            </div>

                <div className="films__name">
                    <Link to={link}>
                        {`Episode ${episodId}: ${name}`}
                    </Link>
                </div>

            <div className="film__date">
                {date}
            </div>
        </div>
    )
}

export default FilmItem;
