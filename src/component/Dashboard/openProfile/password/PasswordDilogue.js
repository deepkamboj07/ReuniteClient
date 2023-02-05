import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AlertError from '../../../compo/Alert';
export default function PasswordDilogue(props) {

    const [error,setError]=React.useState(false);
    const [errorMsg,setErrorMsg]=React.useState("");
    const [alertType, setAlertType]=React.useState('error');

  const handleClose = () => {
     props.passwordHandler();
  };

  const submitHandler=()=>{
    setError(true);
    setAlertType('info');
    setErrorMsg('Fields can not be empty');
  }
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent style={{padding:'0px 40px', paddingTop:'-10px'}}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter current password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter New password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confirm new password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button style={{color:'grey'}} onClick={handleClose}>Cancel</Button>
          <Button style={{backgroundColor:'rgb(43 90 93)', padding:'4px 20px', color:'white'}} onClick={submitHandler}>Update</Button>
        </DialogActions>
      </Dialog>

      {error && errorMsg!=="" &&  <AlertError showAlert={true} type={alertType} message={errorMsg}/>}
    </div>
  );
}