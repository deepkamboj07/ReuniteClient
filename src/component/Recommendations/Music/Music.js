import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import classes from './music.module.css';
import { DialogContent } from '@mui/material';
import MusicCard from './MusicCard';
import SelectedMusic from './SelectedMusic';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MusicRecomand(props) {

  const [music, setMusic]=React.useState(null);
  const [select, setSelect]=React.useState(false);
  const [selectedMusic, setSelectedMusic]=React.useState(null);
  React.useEffect(()=>{
        fetch(`https://reuniterecommendationserver.onrender.com/api/randomMusic`).then((Response) =>
          Response.json().then((data) => setMusic(data.result))
      );
  },[props.open]);

  const selectHandler=()=>{
    setSelect(!select);
  }
  const selectMusicHandler=(index)=>{
    if(index===null){
      setSelectedMusic(null);
      setSelect(false);
    }
    else
    {
      fetch(`https://reuniterecommendationserver.onrender.com/api/song-by-id/${index}`).then((Response) =>
          Response.json().then((data) => setSelectedMusic(data.result[0]))
      );
      setSelect(true);
    }
  }

  const selectedNullMovie=()=>{
    setSelectedMusic(null);
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
              Music Based On Your Interest
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className={classes.dilogContent}>

            <div className={classes.resultMusicCont}>
              {
                music && music.map((m,index)=>(<MusicCard id={index} song={m} key={m.spotify_id} selectHandler={selectHandler} selectMusicHandler={selectMusicHandler} removeSelect={selectedNullMovie}/>))
              }
            </div>

            {
               !music && <div style={{textAlign:'center' , marginTop:'10%'}}>
                           <div style={{width:'7rem', height:'7rem'}} className="spinner-grow text-info" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                        </div>
              }

              {select && selectedMusic && <SelectedMusic song={selectedMusic} open={select} onClose={selectHandler} selectHandler={selectHandler} selectMusicHandler={selectMusicHandler} removeSelect={selectedNullMovie}/>}
        </DialogContent>
            
      </Dialog>
    </div>
  );
}