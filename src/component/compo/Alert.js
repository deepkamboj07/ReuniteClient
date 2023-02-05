import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import classes from './avtar.module.css';


export default function AlertError(props) {

  const [show,setShow]=React.useState(props.showAlert);
  React.useEffect(()=>{
    setTimeout(()=>{
      setShow(false);
    },2000);
  },[setShow]);
  
  return (
    <React.Fragment>
      {
        show &&
          <Stack className={classes.alert} sx={{ width: '40%',
                      margin:'auto',
                      position:'absolute',
                      left: '50%',
                      transform:'translate(-50%, 0)',
                      bottom:'50px',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:'30000'}
            } spacing={2}>
            {props.type==='error' && <Alert severity="error">{props.message}</Alert>}
            {props.type==='warning' && <Alert severity="warning">{props.message}</Alert>}
            {props.type==='info' && <Alert severity="info">{props.message}</Alert>}
            {props.type==='success' && <Alert severity="success">{props.message}</Alert>}
          </Stack>
      }
    </React.Fragment>
  );

}