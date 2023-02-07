import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './movies.module.css';
import { useState } from 'react';
import MovieCard from './MovieCard';
const apiKey = "api_key=b97316ed479ee4226afefc88d1792909";
const backdropPath = "https://image.tmdb.org/t/p/w1280";



export default function SelectedMovie(props) {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [videoData, setVideoData] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([{}]);

  const gotVideo = (data) => {
    if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find(
            (vid) => vid.name === "Official Trailer"
        );

        setVideoData(trailer ? trailer : data.videos.results[0]);
    }
    };

    const gotRecommendedData = (apiData) => {
        setRecommendedMovies([]);
        let counter = 16;
        // getting data for each of the recommened movies
        for (let movie of apiData.movies) {
            fetch(
                `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}`
            ).then((Response) =>
                Response.json().then((data) =>
                    setRecommendedMovies((recommendedMovies) => [
                        ...recommendedMovies,
                        data.results[0],
                    ])
                )
            );
            counter--;
            if (counter === 0) break;
        }
    };

  React.useEffect(()=>{

    const gotTMDBData = (apiData) => {
        const realMovieData = apiData.results[0];
        setSearchedMovie(realMovieData);

        fetch(
            `https://api.themoviedb.org/3/movie/${realMovieData.id}?${apiKey}&append_to_response=videos`
        ).then((Response) =>
            Response.json().then((data) => gotVideo(data))
        );
    };

    fetch(
        `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${props.movie}`
       ).then((Response) =>
            Response.json().then((data) => gotTMDBData(data))
       );

    fetch(`http://localhost:5000/api/similarity/${props.movie}`).then((Response) =>
        Response.json().then((data) => gotRecommendedData(data))
    );
  },[props.movie])


  const playHandler=()=>{
    props.viewTrailer(videoData);
  }

  const RenderMovies = () =>
        recommendedMovies.map((movie) => {
            if (movie) {
                return (
                    <MovieCard
                        key={movie.id + movie.original_title}
                        movie={movie}
                        previoudDilogue={false}
                        setCurrMovies={props.setCurrMovies}
                    />
                );
            } else {
                return null;
            }
        });

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={()=> props.onClose()}
        className={classes.selectedMovie}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle className={classes.selectedMovie_cont}>{props.movie}</DialogTitle>
        <DialogContent className={classes.selectedMovie_cont + ' ' + classes.DialogContent}>

            <div
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${backdropPath}${searchedMovie?.backdrop_path})`,
                }}
                className={classes.MainBackGround}>

                <div className={'container '+classes.movie_details}>
                    <div className="row ">
                        <div className={'col-md-6 col-md-push-6 ' + classes.left_box}>
                            <h1 className={classes.topTitle_Movie}>
                                {searchedMovie.title}{" "}
                            </h1>

                            <p className={classes.overviewContent}>
                                {searchedMovie.overview}
                            </p>
                            <div className={classes.ratingcont}>
                                <div>
                                    <b>Rating{" : "}</b>
                                    {searchedMovie.vote_average}
                                    {"/10 "}

                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <div>
                                    <b> Release Date </b>
                                    {" : "} {searchedMovie.release_date}
                                </div>
                            </div>
                            <div>
                                <button
                                    className={classes.trailer_bttn}
                                    onClick={playHandler}
                                >
                                    <i className="fa-solid fa-play"></i>
                                    {" Watch Trailer"}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 col-md-pull-6 text-center">
                            <img
                                className={classes.main_img}
                                src={`https://image.tmdb.org/t/p/w500${searchedMovie?.poster_path}`}
                                alt="Movie"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.recommendedMovie}>
                {recommendedMovies.length > 1 && <h6>Movies based on your current movies</h6>}
                <div className={classes.recommendedGrid}>
                    {RenderMovies()}
                </div>
            </div>
        </DialogContent>
        <DialogActions className={classes.selectedMovie_cont}>
          <Button onClick={()=> props.onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}