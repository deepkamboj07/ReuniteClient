import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import classes from './appbar.module.css';
import MovieRecomand from '../../Recommendations/Movie/Movies';
import MusicRecomand from '../../Recommendations/Music/Music';
import Game from '../../Recommendations/Game/Game';

export default function RecomandDeopDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const [openMovie, setOpenMovie]=React.useState(false);
  const [openMusic, setOpenMusic]=React.useState(false);
  const [openGame, setOpenGame]=React.useState(false);


  const movieHandler=()=>{
    setOpenMovie(!openMovie);
  }
  const musicHandler=()=>{
    setOpenMusic(!openMusic);
  }
  const gameHandler=()=>{
    setOpenGame(!openGame);
  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <React.Fragment>
        <button className={classes.recomButton} onClick={handleMenuOpen}>Recommendation</button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className={classes.menuItem} onClick={movieHandler}><i className="fa-solid fa-film"></i>Movies</MenuItem>
        <MenuItem className={classes.menuItem} onClick={musicHandler}><i className="fa-solid fa-music"></i>Musics</MenuItem>
        <MenuItem className={classes.menuItem} onClick={gameHandler} ><i className="fa-solid fa-gamepad"></i>Games</MenuItem>
      </Menu>
      {openMovie && <MovieRecomand handleClose={movieHandler} open={openMovie}/>}
      {openMusic && <MusicRecomand handleClose={musicHandler} open={openMusic}/>}
      {openGame && <Game handleClose={gameHandler} open={openGame}/>}
    </React.Fragment>
  );
}