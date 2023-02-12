import classes from '../friendsidebar.module.css';
import AvtarPreview from '../../../compo/AvtarPreview';
import { Tooltip } from '@mui/material';
import { useEffect} from 'react';
import { useSelector } from 'react-redux';

const PendingListItem=(props)=>{
    const accept=()=>{
        props.acceptHandler(props.id,props.senderId);
    }
    const reject=()=>{
        props.rejectHandler(props.id);
    }
    const len=useSelector(state=>state.friend.friendPendingList.length);
    if(len===0)
    {
        document.title=`Reunite`;
    }
    useEffect(()=>{
        if(len && len > 0)
        {
            document.title=`( ${len} ) Reunite`;
        }
        else {
            document.title=`Reunite`;
        }
    },[len]);

    return(
        <Tooltip title={props.mail}>
            <div className={classes.pendingItem_cont}>
                <AvtarPreview username={props.username} large={false}/>
                <div className={classes.usernamePendingList}>
                {`${props.username.length <= 10 ? props.username : props.username.substring(0,10) + '..'}`}
                </div>

                <div className={`${classes.invitaion_buton_wraper}`} >
                    <button title='accept' onClick={accept}><i className="fa-solid fa-check"></i></button>
                    <button title='reject' onClick={reject}><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        </Tooltip>  
    )
}
export default PendingListItem;