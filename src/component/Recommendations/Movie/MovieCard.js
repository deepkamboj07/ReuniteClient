// This is the movie card component
import { useState } from 'react';
import classes from './movies.module.css';
const MovieCard = ({ movie ,setCurrMovies}) => {
   // const currentMovie = movie.title;
    const [openMovie, setOpenMovie]=useState(false);
    const currentMovie = movie.title;
    const goToMovie = () => {
        setCurrMovies(null);
        setTimeout(()=>{
            setCurrMovies(currentMovie);
        },100);
        setOpenMovie(!openMovie);
    };

    const img_path = "https://image.tmdb.org/t/p/w342";

    return (
        <div className={classes.Main_Card} onClick={goToMovie}>
            {movie.poster_path && (
                <img
                    src={img_path + movie.poster_path}
                    alt={movie.title}
                    title={movie.title}
                    className={classes.Poster}
                />
            )}
            <div className={classes.Movie_Title}>{movie.title}</div>
            {movie.vote_average ? (
                <span className={classes.movie_voting}>
                    {movie.vote_average}
                    <i className="fa fa-star" aria-hidden="true"></i>
                </span>
            ) : null}
           
        </div>
    );
};

export default MovieCard;
