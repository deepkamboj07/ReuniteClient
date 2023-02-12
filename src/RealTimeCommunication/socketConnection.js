import io from 'socket.io-client'
import store from '../store/store';
import { friendsAction } from '../store/friendsStore';
import updateChatHistoryOfUser from '../sessions/chat';
import { chatAction } from '../store/chatStore';
import { newRoomCreated , updateActiveRoom} from './roomHandler';
import * as WebRTCHandler from './WebRTCHandler';
import { soundAction } from '../store/soundStore';
let socket=null;
export const connectWithSocketServer=(userDetail)=>{
    //console.log(userDetail);
    //const dispatch=useDispatch();
    socket=io('https://reuniteserverr.onrender.com',{
        auth:{
            token:userDetail.token
        }
    });

    socket.on('connect',()=>{
        console.log('sucessfully connected with socket.io server');
        //console.log(socket.id);
    });

    socket.on('friends-invitations',(data)=>{
        const pendingInvitations=data.pendingInvitations;
        const prev=store.getState().friend.friendPendingList;
        store.dispatch(friendsAction.setPendingFriendInvitation(pendingInvitations));
        if(pendingInvitations.length > prev)
        {
            store.dispatch(soundAction.setSound({soundType:'invitation'}));
        }
        else store.dispatch(soundAction.stopSound());
    })

    socket.on('friends-list',(data)=>{
        const friendsList=data.friendsList;
        store.dispatch(friendsAction.setFriend(friendsList));
    })

    socket.on('online-users',(data)=>{
        //console.log('online users data come');
        store.dispatch(friendsAction.setOnlineUser(data.onlineUsers));
    })

    socket.on("usertyping",(data)=>{
        if(data.typing)
            store.dispatch(chatAction.setTypingTrue(data.senderId));
        else{
            store.dispatch(chatAction.setTypingFalse(data.senderId));
        }
    })

    socket.on('direct-chat-history',(data)=>{
         updateChatHistoryOfUser(data);
    })

    socket.on('room-created',(data)=>{
        newRoomCreated(data);
    })
    socket.on('active-rooms',(data)=>{
        updateActiveRoom(data);
    })

    socket.on('connection-prepare',(data)=>{
        WebRTCHandler.prepareNewPeerConection(data.connectedUserSocketId,false);
        socket.emit('conn-init',{connectedUserSocketId:data.connectedUserSocketId});
    })

    socket.on('conn-init',(data)=>{
        const connectedUserSocketId=data.conectedUserSocketId;
        WebRTCHandler.prepareNewPeerConection(connectedUserSocketId,true);
    })

    socket.on('conn-signal',(data)=>{
        WebRTCHandler.handlingSignalingData(data);
    })

    socket.on('room-participants-left',(data)=>{
        WebRTCHandler.handleParticipantsLeaveRoom(data);
    })
}

export const sendDirectMessage=(data)=>{
    socket.emit('direct-message',data);
}

export const disconnectUser=()=>{
    socket.emit('disconnectUser',{
        message:'disconnect done',
    });
}

export const sendUserTyping=(data)=>{
    socket.emit('user-typing',data);
}
export const getdirectChatHistory=(data)=>{
    socket.emit('direct-chat-history',data);
}
export const createNewRoom=()=>{
    socket.emit('room-created');
}
export const joinRoom=(data)=>{
    socket.emit('room-join',data);
}
export const leaveRoom=(data)=>{
    socket.emit('leave-room',data);
}
export const signalPeerData=(data)=>{
    socket.emit('conn-signal',data);
}