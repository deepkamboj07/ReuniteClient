import { createSlice } from "@reduxjs/toolkit";

const initialState={
    chatType:null,
    chosenChatDetails:null,
    messages:[]
}

const chatSlice=createSlice({
    name:'Chating',
    initialState:initialState,
    reducers:{
        setChoosenSetDetails(state,actions)
        {
            state.chosenChatDetails=actions.payload.chatDetails;
            state.chatType=actions.payload.chatType;
            state.messages=[];
        },
        setMessages(state,actions)
        {
            state.messages=actions.payload;
        },
        setTypingTrue(state, actions)
        {
            console.log(actions.payload);
            if(state.chosenChatDetails?._id===actions.payload)
            {
                state.chosenChatDetails.isTyping=true;
            }
            else state.chosenChatDetails.isTyping=false;

            console.log(state.chosenChatDetails.isTyping)
        },
        setTypingFalse(state,actions)
        {
            if(state.chosenChatDetails?._id===actions.payload)
            {
                state.chosenChatDetails.isTyping=false;
            }
            console.log(state.chosenChatDetails.isTyping)
        }
    }
});

export const chatAction=chatSlice.actions;
export default chatSlice.reducer;