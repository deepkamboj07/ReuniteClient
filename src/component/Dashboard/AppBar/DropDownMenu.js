import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import classes from './appbar.module.css';
import ProfileDilogue from '../openProfile/ProfileDilogue';
import { useSelector, useDispatch } from 'react-redux';
import { roomAction } from '../../../store/createRoomStore';
import RecomandDeopDown from './RecomandDropDown';
import ConfirmLogoutDilogue from '../../Authentication/ConfirmLogoutDilogue';

export default function DropDownMenu(props) {
  const [openProfile, setOpenProfile]=React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const audioOnly=useSelector(state=> state.room.audioOnly);
  const open = Boolean(anchorEl);
  const dispatch= useDispatch();
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileClose=()=>{
    setOpenProfile(false);
  }
  const profileOpen=()=>{
    setOpenProfile(true);
  }

  const handleLogout=()=>{
    props.logout();
  }

  const [openLogout, setOpenLogout]= React.useState(false);
  const openLogoutAlert=()=>{
      setOpenLogout(true);
  }
  const closeLogoutAlert=()=>{
    setOpenLogout(false);
  }

  const audioHandler=()=>{
    dispatch(roomAction.setAudioOnly(!audioOnly));
    dispatch(roomAction.setUserJoinWithAudioOrNot());
  }

  return (
    <div className={classes.sideItems}>
      <div className={classes.systems}>
        <RecomandDeopDown/>
      </div>

      <div>
      <button className={classes.menuBtn} onClick={handleMenuOpen}><i className="fa-solid fa-ellipsis-vertical"></i></button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className={classes.menuItem} onClick={profileOpen}><i className="fa-solid fa-user"></i>Profile</MenuItem>
        <MenuItem className={classes.menuItem} onClick={audioHandler}><i className="fa-solid fa-microphone"></i>{`${audioOnly ? "Audio Only Enabled" : "Audio Only Disabled"}`}</MenuItem>
        <MenuItem className={classes.menuItem} onClick={openLogoutAlert}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</MenuItem>
      </Menu>
      {openLogout && <ConfirmLogoutDilogue handleClose={closeLogoutAlert} open={openLogout} logout={handleLogout}/>}
      {openProfile && <ProfileDilogue handleClose={profileClose} open={openProfile}/>}
      </div>

    </div>
  );
}