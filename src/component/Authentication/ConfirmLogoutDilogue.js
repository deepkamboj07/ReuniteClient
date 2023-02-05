import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ConfirmLogoutDilogue(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const open=props.open;
  const handleClose = () => {
     props.handleClose();
  };

  const logoutHandler=()=>{
    props.logout();
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" style={{marginTop:'30px'}}>
          {" Are you sure, you want to logout ? "}
        </DialogTitle>
        <DialogActions style={{marginBottom:'30px', display:'flex', justifyContent:'center'}}>
          <Button autoFocus onClick={handleClose} style={{backgroundColor:'transparent', color:'grey', fontSize:'12px', padding:'7px 12px'}}>
            Cancel
          </Button>
          <Button onClick={logoutHandler} autoFocus style={{backgroundColor:'#43a8ae', color:'white', fontSize:'10px', padding:'7px 12px'}}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}