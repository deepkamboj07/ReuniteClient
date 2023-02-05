import { useState } from 'react';
import classes from '../room.module.css';
import VideoCamIcon from '@mui/icons-material/Videocam'
import VideoCamOffIcon from '@mui/icons-material/VideocamOff'

const CameraButton=(props)=>{
    const [cameraEneble, setCameraEneble]=useState(true);
    const cameraHandler=()=>{
        
        props.localStream.getVideoTracks()[0].enabled= (!cameraEneble);
        setCameraEneble(!cameraEneble);

    }
    return(
        <button className={classes.buttonRoom} onClick={cameraHandler}>
            {cameraEneble ? <VideoCamIcon/> : <VideoCamOffIcon/>}
        </button>
    )
}
export default CameraButton;