import store from "../store/store"
import { roomAction } from "../store/createRoomStore"
import * as socketConnection from "./socketConnection";
import * as WebRTCHandler from './WebRTCHandler';
export const createNewRoom=()=>{
    const callback=()=>{
        store.dispatch(roomAction.openRoom({roomCreator:true,inRoom:true}));
        socketConnection.createNewRoom();
    }
    const audioOnly=store.getState().room.audioOnly;
    WebRTCHandler.getLocalStramPreview(audioOnly,callback);
}

export const newRoomCreated=(data)=>{
    const roomDetail=data.roomDetail;
    store.dispatch(roomAction.setRoomDetails(roomDetail));
}

export const updateActiveRoom=(data)=>{
    const activeRoom=data.activeRooms;
    const friend=store.getState().friend.friendList;
    const rooms=[];
    activeRoom.forEach(room => {
        friend.forEach(frnd=>{
            if(frnd._id=== room.roomCreater.userId){
                rooms.push({...room,creatorUsername:frnd.name});
            }
        })
    });
    store.dispatch(roomAction.setActiveRooms(rooms));
}

export const joinRoom=(roomId)=>{
    const callback=()=>{
        store.dispatch(roomAction.setRoomDetails({roomId}));
        store.dispatch(roomAction.openRoom({roomCreator:false,inRoom:true}));
        socketConnection.joinRoom({roomId});
    }
    const audioOnly=store.getState().room.audioOnly;
    WebRTCHandler.getLocalStramPreview(audioOnly,callback);
}

export const leaveRoom=()=>{
    const roomId= store.getState().room.roomDetails.roomId;
    
    const localStream=store.getState().room.localStreams;
    if(localStream)
    {
        localStream.getTracks().forEach(track=>track.stop());
        store.dispatch(roomAction.setLocalStream(null));
    }

    store.dispatch(roomAction.setRemoteStream([]));
    
    const screenShareStream= store.getState().room.screanSharingStream;
    if(screenShareStream)
    {
        screenShareStream.getTracks().forEach(f=>f.stop());
        store.dispatch(roomAction.setScreenShareStream(null));
    }
    WebRTCHandler.closeAllConnection();

    socketConnection.leaveRoom({roomId});
    store.dispatch(roomAction.setRoomDetails(null));
    store.dispatch(roomAction.openRoom({roomCreator:false,inRoom:false}))
}