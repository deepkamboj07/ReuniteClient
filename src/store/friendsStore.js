import { createSlice } from "@reduxjs/toolkit";

const initialState={
    friendList:[],
    friendPendingList:[],
    onlineUsers:[]
}

const friendSlice=createSlice({
    name:'Friends',
    initialState:initialState,
    reducers:{
        removeFriendInvitation(state,action){
            state.friendPendingList=state.friendPendingList.filter(arr=>arr._id!==action.payload);
        },
        setFriend(state,action){
           if(action.payload.length > 0)
           {
                state.friendList=action.payload[0].friendsDetails;
           }
        },
        setOnlineUser(state,action){
            state.onlineUsers=action.payload;
        },
        setPendingFriendInvitation(state,action){
           // console.log(action);
            state.friendPendingList=action.payload;
        }
    }
});



export const friendsAction= friendSlice.actions;
export default friendSlice.reducer;
