import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isUserInRoom:false,
    iseUserRoomCreator:false,
    roomDetails:null,
    activeRoom:[],
    localStreams:null,
    remoteStreams:[],
    audioOnly:false,
    screanSharingStream:null,
    isScreenSharingActive:false,
    isUserJoinedWithOnlyAudio:false
}
const roomSlice=createSlice({
    name:'room',
    initialState:initialState,
    reducers:{
        openRoom(state,action){
            state.iseUserRoomCreator=action.payload?.roomCreator || false;
            state.isUserInRoom=action.payload?.inRoom || false;
        },
        setRoomDetails(state,action){
            state.roomDetails=action.payload;
        },
        setActiveRooms(state,action){
            state.activeRoom=action.payload;
        },
        setLocalStream(state,action){
            state.localStreams=action.payload;
        },
        setRemoteStream(state,action){
            state.remoteStreams=action.payload;
        },
        setAudioOnly(state,action){
            state.audioOnly=action.payload;
        },
        setScreenShareStream(state,action){
            state.isScreenSharingActive=(action.payload)? true : false;
            state.screanSharingStream=action.payload;
        },
        setUserJoinWithAudioOrNot(state){
            state.isUserJoinedWithOnlyAudio= (!state.isUserJoinedWithOnlyAudio);
        }
    }
});

export const roomAction=roomSlice.actions;
export default roomSlice.reducer;
