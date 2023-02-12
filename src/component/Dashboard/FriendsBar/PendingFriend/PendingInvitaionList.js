import classes from '../friendsidebar.module.css';
import PendingListItem from './PendingListItem';
import {useSelector, useDispatch} from 'react-redux';
import AlertError from '../../../compo/Alert';
import { Fragment, useEffect, useState } from 'react';
import { rejectInvitation, acceptInvitation } from '../friendsFunctions';
import { friendsAction } from '../../../../store/friendsStore';
import { soundAction } from '../../../../store/soundStore';

const audio=new Audio('./request_pop_up.wav');

const PendingInvitaionList=()=>{
    const dispatch=useDispatch();
    const [msg,setMsg]=useState('');
    const [isNotify,setNotify]=useState(false);
    const [notificationType, setType]=useState('success');
    const token=localStorage.getItem('token');
    const sound=useSelector(state=> state.sound.soundType);
    
    useEffect(()=>{
            if(sound)
            {
                audio.autoplay=true;
                audio.play().then(e=>console.log(e)).catch(err=>console.log(err));
                dispatch(soundAction.stopSound());
            }
    },[sound,dispatch])

    const acceptRequest=(id,senderId)=>{
        acceptInvitation(id,token,senderId).then(res=>{
            setNotify(true);
            setMsg(res.message);
            if(res.status!==200)
            {
                setType('error');
            }
            else
            {
                dispatch(friendsAction.removeFriendInvitation(id));
            }
        });
    }

    //handler reject request
    const rejectRequest=(id)=>{
        rejectInvitation(id,token).then(res=>{
            setNotify(true);
            setMsg(res.message);
            if(res.status!==200)
            {
                setType('error');
            }
            else
            {
                dispatch(friendsAction.removeFriendInvitation(id));
            }
        })
    }


    const pendingData=useSelector(state=>state.friend.friendPendingList);
    let data;
    if(pendingData.length>0)
    {
        data=pendingData.map(list=>(
            <PendingListItem key={list._id} id={list._id} 
            mail={list.Sender_details[0].email} 
            username={list.Sender_details[0].name}
            senderId={list.Sender_details[0]._id}
            acceptHandler={acceptRequest}
            rejectHandler={rejectRequest}
            />
        ))
    }
    else document.title="Reunite"

    useEffect(()=>{
        setTimeout(()=>{
            setNotify(false);
        },1000)
    });



       return(
        <Fragment>
            <div className={classes.pending}>
                {
                    data
                }
            </div>
            {isNotify && <AlertError message={msg} showAlert={true} type={notificationType}/>}
        </Fragment>
    )
}
export default PendingInvitaionList;