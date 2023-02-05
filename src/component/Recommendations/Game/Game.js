import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import classes from './game.module.css';
import { DialogContent } from '@mui/material';
import data from './gameData';
import GameCard from './GameCard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Game(props) {

  const renderGame=()=>{
        return data.map(d=>(<GameCard key={d.id} game={d}/>));
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
              Play Games
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className={classes.dilogContent}>
            <div className={classes.resultGameCont}>
              {renderGame()}
            </div>
        </DialogContent>
            
      </Dialog>
    </div>
  );
}