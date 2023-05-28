import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import classes from './movies.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import MovieCard from './MovieCard';
import SelectedMovie from './SelectedMovie';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const apiKey = "api_key=b97316ed479ee4226afefc88d1792909";
let genre=[{title:'Action',choice:false,id:28},{title:'Adventure',choice:false,id:12},{title:'Comedy',choice:false,id:35},{title:'Horror',choice:false,id:27},{title:'Thriller',choice:false,id:53},{title:'Drama',choice:false,id:18},{title:'Science Fiction',choice:false,id:878},{title:'Romentic',choice:false,id:10749}];
export default function MovieRecomand(props) {

    const [currMovies, setCurrMovies]=React.useState([]);
    const intrest=useSelector(state=> state.user.intrest);
    const [selectedMovie,setSelectedMovie]=React.useState(null);
    const [seeTrailer,setSeeTrailer]=useState(false);
    const [videoData, setVideoData]=useState(null);
    const [spiner, setSpiner]=useState(true);
    const [movieGenre,setMovieGenere]=useState(intrest.movies);
    // const [notification, setNotification]=React.useState(false);
    // const [errMsg,setMsg]=React.useState('');
    // const [type,setType]=React.useState('error')
    React.useEffect(()=>{

      const selectG=[];
      movieGenre?.forEach(g => {
        const ind=genre.find(m=>m.title===g);
        console.log(ind);
        if(ind)
        {
          ind.choice=true;
          selectG.push(ind.id);
        }
      });

      console.log(movieGenre);
      if(movieGenre.length>0){
        fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&release_date.lte=2018&${apiKey}&with_genres=${encodeURI(
            selectG.join(',')
          )}`
        ).then(Response=>{

            console.log(selectG);
            Response.json().then((data) => { 
              setCurrMovies(data.results)
              setSpiner(false);
            });
        }).catch(err=>{console.log(err)});
     }
    },[movieGenre]);

    // React.useEffect(()=>{
    //   setTimeout(()=>{
    //     setNotification(false);
    //     setMsg('');
    //   },2000);
    // },[notification])

    const renderMovies = () =>
        currMovies.map((movie) => {
            if (movie) {
                return (
                    <MovieCard
                        key={movie.id + movie.original_title}
                        movie={movie}
                        closePreviouDilogue={false}
                        setCurrMovies={setSelectedMovie}
                    />
                );
            } else {
                return null;
            }
    });

    const selectMovieHandler=()=>{
      setSelectedMovie(null);
    }

    const viewTrailer=(videoData)=>{
      setVideoData(videoData);
      setSeeTrailer(true);
    }
    const stopTrailer=()=>{
        setSeeTrailer(false);
    }

    const handleSelectGenere=(index)=>{
        const isThere=movieGenre.find(mov=>mov===genre[index].title);
        if(isThere)
        {
            genre[index].choice=false;
            const tmp=movieGenre.filter(t=>t!==genre[index].title);
            setMovieGenere(tmp);
        }
        else
        {
          genre[index].choice=true;
          setMovieGenere([...movieGenre,genre[index].title]);
        }
    }

  return (
    <div style={{backgroundColor:'black'}}>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' ,backgroundColor:'#0f1011', color:'white'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, display:'flex', alignItems:'center' , justifyContent:'center'}} variant="h6" component="div">
              Movies Based On Your Interest
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.movieCont}>
            <div className={classes.genre}>
            <div className={classes.buttonGrid}>
                {
                    genre.map((g,index)=>(
                     <div key={index} className={`${g.choice ? classes.genreTagON :classes.genreTagOFF}`} onClick={()=>handleSelectGenere(index)}>
                        {g.title}
                      </div>
                    ))
                }
            </div>
            </div>

            {
              spiner && <div style={{textAlign:'center' , marginTop:'10%'}}>
                           <div style={{width:'6rem', height:'6rem'}} className="spinner-grow text-info" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                        </div>
            }

            {movieGenre.length > 0}
            {
              <div className={classes.resultMovieCont}>
                {
                    movieGenre.length > 0 && renderMovies()
                }
              </div>
            }

            {movieGenre.length===0 && !spiner &&
              <div style={{textAlign:'center', width:'100%', color:'white', marginTop:'10%'}}>You dont select your intrest at the time of registration</div>
            }
        </div>
        {selectedMovie && <SelectedMovie onClose={selectMovieHandler} open={true} movie={selectedMovie} viewTrailer={viewTrailer} setCurrMovies={setSelectedMovie}/>}
        {seeTrailer && <VideoPlayer play={seeTrailer} open={seeTrailer} stopTrailer={stopTrailer} videoData={videoData}/>}
        {/* {notification && errMsg!=='' && <AlertNotification showAlert={true} type={type} message={errMsg}/>} */}
      </Dialog>
    </div>
  );
}