import classes from '../friendsidebar.module.css';
import AvtarPreview from '../../../compo/AvtarPreview';
import { Tooltip } from '@mui/material';

const PendingListItem=(props)=>{
    const accept=()=>{
        props.acceptHandler(props.id,props.senderId);
    }
    const reject=()=>{
        props.rejectHandler(props.id);
    }
    return(
        <Tooltip title={props.mail}>
            <div className={classes.pendingItem_cont}>
                <AvtarPreview username={props.username} large={false}/>
                <div className={classes.usernamePendingList}>
                {`${props.username.length <= 10 ? props.username : props.username.substring(0,10) + '..'}`}
                </div>

                <div className={`${classes.invitaion_buton_wraper}`} >
                    <button onClick={accept}><i className="fa-solid fa-check"></i></button>
                    <button onClick={reject}><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        </Tooltip>  
    )
}
export default PendingListItem;