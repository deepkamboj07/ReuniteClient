import classes from './messanger.module.css';
import Messages from './messages/Messages';
import NewMessage from './messages/NewMessage';
import { useEffect } from 'react';
import { getdirectChatHistory } from '../../../RealTimeCommunication/socketConnection';
const MessangerContent=(props)=>{

    useEffect(()=>{
        getdirectChatHistory({
            recevierId:props.userDetails._id
        })
    },[props.userDetails])
    return(
        <div className={classes.messangerWraper}>
            <Messages/>
            <NewMessage name={props.userDetails?.name} id={props.userDetails?._id}/>
        </div>
    )
}
export default MessangerContent;