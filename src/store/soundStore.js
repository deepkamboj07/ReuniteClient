import { createSlice } from "@reduxjs/toolkit";

const initialState={
    soundType:null,
    start:false,
}

const soundSlice=createSlice({
    name:'soundNotification',
    initialState:initialState,
    reducers:{
        setSound(state, action){
            state.soundType=action.payload.soundType;
            state.action=true;
        },
        stopSound(state){
            state.soundType=null;
            state.action=false;
        }
    }
});

export const soundAction=soundSlice.actions;
export default soundSlice.reducer;