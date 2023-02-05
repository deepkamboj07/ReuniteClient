import { useEffect, useRef, useState } from 'react';
import CloseFullScreen from '@mui/icons-material/CloseFullscreen'
import OpenFullScreen from '@mui/icons-material/OpenInFull'
import classes from './room.module.css';
const Video =(props)=>{
    const [videoBig, setVideoBig]=useState(false);
    const videoRef=useRef();
    useEffect(()=>{
        const video=videoRef.current;
        video.srcObject=props.stream;
        video.onloadmetadata=()=>{
            video.play();
        }
    },[props.stream])

    const videoResizeHandler=()=>{
        setVideoBig(!videoBig);
        props.resize();
    }
    return(
        <div className={`${videoBig? classes.videoBigContainer : classes.userVideoContainer}`}>
            <video className={classes.videoEL} ref={videoRef} autoPlay muted={props.isLocalStream ? true: false}>
            </video>
            <button className={classes.vidoResizeBtn} onClick={videoResizeHandler}>
                {videoBig ? <CloseFullScreen/> : <OpenFullScreen/>}
            </button>
        </div>
    )
}
export default Video;