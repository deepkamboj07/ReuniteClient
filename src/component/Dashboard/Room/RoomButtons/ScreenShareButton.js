import classes from '../room.module.css';
import ScreenShare from '@mui/icons-material/ScreenShare'
import StopScreenShare from '@mui/icons-material/StopScreenShare'
import { useDispatch, useSelector } from 'react-redux';
import { roomAction } from '../../../../store/createRoomStore';
import * as WebRTCHandler from '../../../../RealTimeCommunication/WebRTCHandler'
const constraints={
    audio:false,
    video:true
}
const ScreenShareButton=(props)=>{

    const screenShareStream=useSelector(state=>state.room.screanSharingStream);
    const isScreenSharingActive= useSelector(state=> state.room.isScreenSharingActive);
    const dispatch=useDispatch();

    const screenHandler=async()=>{
        if(!isScreenSharingActive)
        {
            let stream=null;
            try{
                stream= await navigator.mediaDevices.getDisplayMedia(constraints);
            }catch(err){
                console.log('error occoured on your device while accessing sharing screen');
            }
            if(stream)
            {
                dispatch(roomAction.setScreenShareStream(stream));
                WebRTCHandler.switchOutGoingTracks(stream)
            }
        }
        else{
            WebRTCHandler.switchOutGoingTracks(props.localStream);
            screenShareStream.getTracks().forEach(f=> f.stop());
            dispatch(roomAction.setScreenShareStream(null));
        }
    }
    return(
        <button className={classes.buttonRoom} onClick={screenHandler}>
            {isScreenSharingActive ? <StopScreenShare/> : <ScreenShare/>}
        </button>
    )
}
export default ScreenShareButton;