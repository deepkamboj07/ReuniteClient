import classes from './sidebar.module.css';
import CreateRoomButton from './CreateRoomButton';
import GroupIcon from '@mui/icons-material/Groups'
import { useSelector } from 'react-redux';
import ActiveRoomButtons from './AvtiveRoomButton';

const Sidebar=()=>{
    const rooms=useSelector(state=>state.room.activeRoom);
    const isInRoom=useSelector(state=>state.room.isUserInRoom);
    return(
        <div className={classes.sidebar}>
            <button className={classes.groupButton}>
                <GroupIcon/>
            </button>
            <CreateRoomButton/>
            <div style={{margin:'10px'}}>
            {
                rooms.map(room=>(
                        <ActiveRoomButtons key={room.roomId} creatorUserName={room.creatorUsername} participantsAmount={room.participants.length} isUserInRoom={isInRoom} roomId={room.roomId}/>
                    ))
            }
            </div>
        </div>
    )
}
export default Sidebar;