import classes from '../room.module.css';
import CloseIcon from '@mui/icons-material/Close'
import * as roomHandler from '../../../../RealTimeCommunication/roomHandler';
const CloseRoomButton=()=>{
    const closeRoomHandler=()=>{
        roomHandler.leaveRoom();
    }
    return(
        <button className={classes.buttonRoom} onClick={closeRoomHandler}>
            <CloseIcon/>
        </button>
    )
}
export default CloseRoomButton;