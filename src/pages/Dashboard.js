// import { useEffect, useState } from 'react';
// import { extractUserInfo } from '../component/Authentication/auth';
import '../index.css';

import Sidebar from "../component/Dashboard/SideBar/Sidebar";
import FriendSideBar from '../component/Dashboard/FriendsBar/FriendSideBar';
import Messanger from "../component/Dashboard/Messanger/Messanger";
import AppBar from "../component/Dashboard/AppBar/AppBar";
import {useSelector, useDispatch} from 'react-redux';
import { extractUserInfo } from '../component/Authentication/auth';
import { connectWithSocketServer } from '../RealTimeCommunication/socketConnection';
import Room from '../component/Dashboard/Room/Room';
import { userAction } from '../store/userStore';
import { userIntrestFetch } from '../component/Recommendations/apiFunctions';
import { useEffect } from 'react';
    
    let oneTime=true;
    const email=localStorage.getItem('email');
    const token=localStorage.getItem('token');
    const userid=localStorage.getItem('userId')
    const name=localStorage.getItem('username');
    
    const userDetail={
        token:token,
        username:name,
        email:email,
        userid:userid
    }
    if(userid && oneTime){
        oneTime=false;
        connectWithSocketServer(userDetail);
    }

function DashBoard(props){


    const dispatch=useDispatch();
    useEffect(()=>{
        const tokenn=localStorage.getItem('token');
        extractUserInfo(tokenn).then(user=>{
            dispatch(userAction.setUserDetails({email:user.email, userid:user.userid, profileImage: user.profileImage, username:user.name}));
        });
    },[props.open]);
    if(token)
    {
        userIntrestFetch(token).then(result=>{
            if(result.status==='200' && result?.intrest)
            {
                dispatch(userAction.setIntrest(result.intrest));
            }
            else{
                console.log(result);
            }
        });

        // getting the list of all genres
        // fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`).then(
        //     (Response) =>
        //         Response.json().then((data) => console.log(data))
        // );
    }

    const logoutHandler=()=>{
        props.logout();
    }

    const isUserInRoom=useSelector(state=> state.room.isUserInRoom);

    return(
        <div className='wraper'>
            <Sidebar/>
            <FriendSideBar/>
            <Messanger/>
            <AppBar logout={logoutHandler}/>
            {isUserInRoom && <Room/>}
        </div>
    )
}
export default DashBoard;