import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classes from '../friendsidebar.module.css';
import { validateUserThroughEmail , sendFriendInvitations} from '../friendsFunctions';
import AlertError from '../../../compo/Alert';

export default function SendRequestDilogue(props) {

 const [email ,setEmail]= React.useState("");
 const [error,setError]=React.useState(true);
 const [errorMsg,setErrorMsg]=React.useState("");
 const [alertType, setAlertType]=React.useState('error');
 //const friendList=useSelector((state)=>state.friend.friendList);

 const emailHandler=(event)=>{
    setEmail(event.target.value);
 }

 React.useEffect(()=>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(validRegex)){
        setError(true);
        setErrorMsg("");
    }
    else setError(false);
 },[email,setError])

 const handlerClose=()=>{
    setError(true);
    setEmail('');
    setErrorMsg('');
    props.handleClose();
 }
 
 const sendRequest=()=>{
    const token=localStorage.getItem('token');
    validateUserThroughEmail(email,token).then(result=>{
        if(result.status===200)
        {
            const userId=localStorage.getItem('userId');
            sendFriendInvitations(userId,result._id,token).then(isSend=>{
              console.log(isSend);
                if(isSend.status===200)
                {
                    setAlertType('success');
                    setError(true);
                    setErrorMsg(isSend.message);
                    setTimeout(()=>{
                      handlerClose();
                    },1500);
                }
                else
                {
                    setAlertType('error');
                    setError(true);
                    console.log(isSend.message);
                    setErrorMsg(isSend.message);
                }
            })
        }
        else
        {
            setError(true);
            setErrorMsg(result.message);
        }
    })
 }

  let inputClass=classes.inputEmail_dilogue;
  return (
    <div>
      <Dialog open={props.openInvitation} onClose={handlerClose}>
        <DialogTitle><span className={classes.dilogue_heading}>Invite a Friend</span></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter e-mail address of friend which you would like to invite.
          </DialogContentText>
          <input type='email' className={inputClass} placeholder="Enater E-mail" onChange={emailHandler}/>
        </DialogContent>
        <DialogActions>
                <Button className={`${!error ? classes.btn_send_dilogue : classes.btn_send_disable}`} onClick={sendRequest}>Send</Button>
        </DialogActions>
      </Dialog>
      {error && errorMsg!=='' && <AlertError showAlert={true} type={alertType} message={errorMsg}/>}
    </div>
  );
}