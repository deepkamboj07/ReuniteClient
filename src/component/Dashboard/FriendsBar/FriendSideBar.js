import classes from './friendsidebar.module.css';
import FriendsTitle from './FriendsTitle';
import PendingInvitaionList from './PendingFriend/PendingInvitaionList';
import FriendList from './FriendList/FriendList';
import { Fragment, useState } from 'react';
import SendRequestDilogue from './FriendList/SendRequestDilogue';
const FriendSideBar=()=>{
    const [openDilogue, setDilogue]= useState(false);
    const dilogueHandler=()=>{
        setDilogue(true);
    }
    const handleCloseDilogue = () => {
        setDilogue(false);
    };
    return(
        <div className={classes.friendsidebar}>
            <Fragment>
                <button className={classes.addfriend_Btn} onClick={dilogueHandler}>Add Friend</button>
                <SendRequestDilogue openInvitation={openDilogue} handleClose={handleCloseDilogue} err={false}/>
            </Fragment>

            <FriendsTitle title={'Private Messages'}/>
            <FriendList/>
            <FriendsTitle title={'Invitations'}/>
            <PendingInvitaionList/>
        </div>
    )
}

export default FriendSideBar;