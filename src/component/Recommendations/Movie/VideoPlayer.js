import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './movies.module.css';
import ReactPlayer from 'react-player'


export default function VideoPlayer(props) {
  const videoData=props.videoData;

  const RenderTrailer = () => {
    return (
        <div>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoData.key}-U`}
                playing={true}
                width="100%"
                height="100%"
                controls={true}
                className={classes.youtube_container}
            />
        </div>
    );
    };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={()=> props.stopTrailer()}
        className={classes.selectedMovie}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle className={classes.selectedMovie_cont}>{props.movie}</DialogTitle>
        <DialogContent className={classes.selectedMovie_cont + ' ' + classes.DialogContent}>

                <div className={"container "+classes.trailerContainer}>
                {
                    videoData && props.open
                        ? RenderTrailer()
                        : <p style={{color:'black', textAlign:'center', padding:'100px 0', fontSize:'24px'}}>Sorry! Trailer is not persent.</p> /*Rendering the trailer*/
                }

            </div>

        </DialogContent>
        <DialogActions className={classes.selectedMovie_cont} style={{display:'flex', justifyContent:'center'}}>
        <div className={props.open ? classes.DisplayOn : classes.DisplayOFF}>
                    <button
                        className={classes.close_bttn}
                        onClick={props.stopTrailer}
                    >
                        Close Trailer
                    </button>
                </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}