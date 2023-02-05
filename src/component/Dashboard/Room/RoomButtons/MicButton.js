import { useState } from 'react';
import classes from '../room.module.css';
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'

const MicButton=(props)=>{
    const [micEneble, setMicEneble]=useState(true);
    const micHandler=()=>{
        props.localStream.getAudioTracks()[0].enabled = (!micEneble);
        setMicEneble(!micEneble);
    }
    return(
        <button className={classes.buttonRoom} onClick={micHandler}>
            {micEneble ? <MicIcon/> : <MicOffIcon/>}
        </button>
    )
}
export default MicButton;