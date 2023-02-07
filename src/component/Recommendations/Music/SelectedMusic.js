import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './music.module.css';
import MusicBar from './MusicBar';
import MusicCard from './MusicCard';


export default function SelectedMusic(props) {

  const [play, setPlay]=React.useState(false);
  const [recomendData, setRecomendData]=React.useState(null);

  React.useEffect(()=>{
      fetch(`https://reuniterecommendationserver.onrender.com/api/music-recomendation-based-on-select/${props.song.song_id}`).then(data=>{
        data.json().then(result=> setRecomendData(result.result));
      })
  },[props.song.song_id]);

  const startSong=()=>{
    setPlay(!play);
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={()=> props.onClose()}
        className={classes.selectedMovie}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle className={classes.selectedMovie_cont}>{props.song.song_name}{play && <MusicBar/>}</DialogTitle>
        <DialogContent className={classes.selectedMovie_cont + ' ' + classes.DialogContent}>

            <div
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${props.song.image_url})`,
                }}
                className={classes.MainBackGround}>

                <div className={'container '+classes.movie_details}>
                    <div className="row ">
                        <div className={'col-md-12 col-md-push-6 ' + classes.left_box}>
                            <h1 className={classes.topTitle_Movie}>
                                {props.song.song_name}{" "}
                            </h1>

                            <div>
                                <div>
                                    <b> Artist name </b>
                                    {" : "} {props.song.artist_name}
                                </div>
                            </div>
                            <div>
                                {
                                    !play && <button
                                    className={classes.trailer_bttn}
                                    onClick={startSong}
                                >
                                    <i className="fa-solid fa-play"></i>
                                    {" Play Song"}
                                </button>
                                }
                                <div style={{textAlign:'center', marginTop:'70px'}}>
                                   {
                                        play &&  (<audio src={props.song.preview} 
                                        style={{width:'90%'}}
                                        autoPlay
                                        controls={true}/>
                                   )}
                                   {
                                     play &&  <div><button onClick={startSong} className={classes.close_bttn}>Close song</button></div>
                                   }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.recommendedMusic}>
                {recomendData?.length > 1 && <h6>songs based on your current song</h6>}
                <div className={classes.recommendedGrid}>
                  {
                    recomendData && recomendData.map((m,index)=>(<MusicCard id={index} song={m} key={m.spotify_id} selectHandler={props.selectHandler} selectMusicHandler={props.selectMusicHandler}/>))
                 } 
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