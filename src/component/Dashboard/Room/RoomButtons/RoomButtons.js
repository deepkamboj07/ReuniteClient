import classes from '../room.module.css';
import CameraButton from './CameraButton';
import MicButton from './MicButton';
import CloseRoomButton from './CloseRoomButton';
import ScreenShareButton from './ScreenShareButton';
import { useSelector } from 'react-redux';
const RoomButtons=()=>{

    const localStream= useSelector(state=> state.room.localStreams);
    const audioOnly=useSelector(state=> state.room.isUserJoinedWithOnlyAudio);
    return(
        <div className={classes.roomButtonsContainer}>
            {!audioOnly && <CameraButton localStream={localStream}/>}
            <MicButton localStream={localStream}/>
            {!audioOnly && <ScreenShareButton localStream={localStream}/>}
            <CloseRoomButton localStream={localStream}/>
        </div>
    )
}
export default RoomButtons;