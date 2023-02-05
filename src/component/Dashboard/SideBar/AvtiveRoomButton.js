import { Button, Tooltip } from '@mui/material';
import AvtarPreview from '../../compo/AvtarPreview';
import * as roomHandler from '../../../RealTimeCommunication/roomHandler';
const ActiveRoomButtons=(props)=>{
    const roomdisable=props.participantsAmount > 3;
    const roomTittle= `Creator: ${props.creatorUserName}. Connected: ${props.participantsAmount}`;

    const roomClickHandler=()=>{
        if(props.participantsAmount< 4)
        {
            roomHandler.joinRoom(props.roomId);
        }
    }

    return(
        <Tooltip title={roomTittle} style={{cursor:'pointer'}}>
            <div>
                <Button style={{
                    width: '42px',
                    height: '42px',
                    color: 'white',
                    padding: '0',
                    outline: 'none',
                    border: '0px none',
                    borderRadius:'16px',
                    overflow:'hidden',
                    marginTop:'10px',
                    backgroundColor:'#43a8ae',
                    minWidth:'0',
                }} disabled={roomdisable || props.isUserInRoom} onClick={roomClickHandler}>
                    <AvtarPreview username={props.creatorUserName} large={false}/>
                </Button>
            </div>
        </Tooltip>
    )
}
export default ActiveRoomButtons;