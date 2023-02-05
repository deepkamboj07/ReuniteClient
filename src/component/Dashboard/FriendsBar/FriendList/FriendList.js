import classes from '../friendsidebar.module.css';
import FriendListItem from './FriendListItem';
import { useSelector } from 'react-redux';

const checkOnlineUsers=(friend=[], onlineuser=[])=>{
    const allData=[];
    friend.forEach((f)=>{
        const isUserOnline=onlineuser.find(user=>user.userId===f._id);
        const isOnline=isUserOnline ? true:false;
        allData.push({
            isOnline:isOnline,
            friend:f
        })
    })
    return allData;
}

const FriendList=()=>{
    const friendList=useSelector(state=>state.friend.friendList);
    const onlineUser=useSelector(state=>state.friend.onlineUsers);

    let data=false;
    if(friendList.length > 0)
    {
        data=checkOnlineUsers(friendList,onlineUser).map(item=>(
            <FriendListItem key={item.friend._id} id={item.friend._id} email={item.friend.email} username={item.friend.name} isOnline={item.isOnline} profileImage={item.friend.profileImage}/>
        ));
    }
    return(
        <div className={classes.friendList}>
            {
                (data) && data
            }
            {
                (!data) && <p className={classes.noFriend}>No Friends 😔</p>
            }
        </div>
    )
}
export default FriendList;