import classes from './sidebar.module.css';
import AddIcon from '@mui/icons-material/Add'
import * as roomHandler from '../../../RealTimeCommunication/roomHandler' 
import { useSelector } from 'react-redux';

const CreateRoomButton=()=>{
    const userInRoom=useSelector(state=>state.room.isUserInRoom);
    const createRoomHandler=()=>{
        roomHandler.createNewRoom();
    }
    return(
            <button className={classes.groupButton} onClick={createRoomHandler} disabled={userInRoom}>
                <AddIcon/>
            </button>
    )
}
export default CreateRoomButton;