import classes from './message.module.css';
import AvtarPreview from '../../../compo/AvtarPreview';
import { Typography } from '@mui/material';
const Message=(props)=>{

    if(props.sameAuthor && props.sameDay)
    {
        return(
            <div className={classes.sameAuthorContent}>
                <div className={classes.sameAuthorText}>{props.content}</div>
            </div>
        )
    }

    return(
        <div className={classes.container}>
            <div className={classes.avtarContainer}>
                { props.profileImage==='profile/default.png' ? <AvtarPreview username={props.username} large={false}/>
                : <AvtarPreview src={`https://reuniteserverr.onrender.com/${props.profileImage}`} icon={true}/>}
            </div>
            <div className={classes.message_conatiner}>
                <Typography style={{fontSize:'16px', color:'#43a8ae', fontWeight:'700'}}>
                    {props.username}{' '}
                    <span style={{fontSize:'10px', color:'#dcddde61'}}>{props.time}</span>
                </Typography>
                <div className={classes.msg_content}>
                    {props.content}
                </div>
            </div>
        </div>
    )
}
export default Message;