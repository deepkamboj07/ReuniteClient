import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import classes from './profile.module.css';
import AvtarPreview from '../../compo/AvtarPreview';
import dummy from './dummy';
import AvtarProfileItem from './AvtarProfileItem';
import { useSelector , useDispatch} from 'react-redux';
import { UpdateImageofProfile } from './profileFunctions';
import AlertNotification from '../../compo/Alert'
import { userAction } from '../../../store/userStore';
import PasswordDilogue from './password/PasswordDilogue';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ProfileDilogue(props) {
    const username=useSelector(state=> state.user.username);
    const email=useSelector(state=>state.user.email);
    const profileImage=useSelector(state=> state.user.profileImage);

    const [openPasswordDilogue, setPasswordDilogue]=React.useState(false);
    const passwordHandler=()=>{
      setPasswordDilogue(!openPasswordDilogue);
    }

    const [url,setUrl]=React.useState(profileImage);
    const dispatch=useDispatch();
    const changeProfileHandler=(src)=>{
        setUrl(src);
    }

    const [notification, setNotification]=React.useState(false);
    const [errMsg,setMsg]=React.useState('');
    const [type,setType]=React.useState('error');

    const passwordRelatedInfo=(errMsg, errtype, notify)=>{
        setNotification(notify);
        setType(errtype);
        setMsg(errMsg);
    }

    React.useEffect(()=>{
      setTimeout(()=>{
        setNotification(false);
        setMsg('');
      },2000);
    },[notification])
    
    const updateProfleHandler=()=>{
      if(url === profileImage)
      {
          setMsg('Its already your profile image');
          setNotification(true);
          setType('info');
      }
      else
      {
        UpdateImageofProfile(localStorage.getItem('token'),url).then(result=>{
          if(result.status===200)
          {
            setMsg(result.message);
            setType('success');
            setNotification(true);
            dispatch(userAction.setProfileImage(url));
          }
          else
          {
            setMsg(result.message);
            setType('error');
            setNotification(true);
          }
        }).catch(err=>{console.log(err)});
      }
    }

  return (
    <div style={{backgroundColor:'black'}}>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' ,backgroundColor:'black'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.profileCont}>
            <div className={classes.dp}>
                {
                    (url===null)?<AvtarPreview username={username} extraLarge={true}/>:
                    <AvtarPreview src={`https://reuniteserverr.onrender.com/${url}`} Big={true}/>
                }
                <div className={classes.avtarDisplay}>
                    {
                        dummy.map(d=>(
                            <AvtarProfileItem key={d._id} src={`https://reuniteserverr.onrender.com/${d.src}`} address={d.src} onSet={changeProfileHandler}/>
                        ))
                    }
                </div>

                <button className={classes.profileUpdateBtn} onClick={updateProfleHandler}>Update Profile Image</button>
            </div>

            <div className={classes.profile_detail}>
                <h3 style={{color:'white'}}>Details</h3>
                <div className={classes.inputEdit}>
                    <label>Username :</label>
                    <p>{username}<span><i className="fa-solid fa-pen-to-square"></i></span></p>
                </div>
                <div className={classes.inputEdit}>
                    <label>E-Mail :</label>
                    <p>{email}</p>
                </div>
                <div className={classes.inputEdit}>
                    <label>Password :</label>
                    <p>******************<span onClick={passwordHandler}><i className="fa-solid fa-pen-to-square"></i></span></p>
                    {openPasswordDilogue && <PasswordDilogue open={openPasswordDilogue} passwordHandler={passwordHandler} passwordRelatedInfo={passwordRelatedInfo}/>}
                </div>
            </div>
        </div>
        {notification && errMsg!=='' && <AlertNotification showAlert={true} type={type} message={errMsg}/>}
      </Dialog>
    </div>
  );
}