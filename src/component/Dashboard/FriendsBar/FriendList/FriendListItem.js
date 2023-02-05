import classes from '../friendsidebar.module.css';
import AvtarPreview from '../../../compo/AvtarPreview';
import OnlineIndicator from './OnlineIndicator';
import { useDispatch} from 'react-redux';
import { chatAction } from '../../../../store/chatStore';
const FriendListItem=(props)=>{

    const dispatch=useDispatch();
    const butonClickHandler=()=>{
        const data={
            chatDetails:{
                _id:props.id,
                name:props.username,
                email:props.email,
                profileImage:props.profileImage
            },
            chatType:'DIRECT'
        }
        dispatch(chatAction.setChoosenSetDetails(data));
    }

    return(
        <button className={classes.friendListItemBtn} onClick={butonClickHandler}>
            <AvtarPreview username={props.username} large={false}/>
            <div className={classes.usernameFriendList}>
                {`${props.username.length <= 11 ? props.username : props.username.substring(0,13) + '.'}`}
            </div>
            {props.isOnline && <OnlineIndicator/>}
        </button>
    )
}
export default FriendListItem;