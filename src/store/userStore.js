import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userId:null,
    username:null,
    token:null,
    email:null,
    profileImage:null,
    intrest:null
}

const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setUserDetails(state,action)
        {
            state.userId=action.payload.userid;
            state.username=action.payload.username;
            state.token=action.payload.token;
            state.email=action.payload.email;
            state.profileImage=action.payload.profileImage;
        },
        setProfileImage(state,action)
        {
            state.profileImage=action.payload;
        },
        setIntrest(state,action)
        {
            state.intrest=action.payload;
        }
    }
});

export const userAction=userSlice.actions;
export default userSlice.reducer;