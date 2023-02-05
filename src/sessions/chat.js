import { chatAction } from "../store/chatStore";
import store from "../store/store";
const updateChatHistoryOfUser=(data)=>{
    const messages=data.messages;
    const participants=data.participants;
    const recevierId=store.getState().chat.chosenChatDetails?._id;
    const userId=localStorage.getItem('userId');

    if(recevierId && userId)
    {
        const userInConversation=[recevierId, userId];
        updateChatHistoryIfSameCoversationActive({participants,messages,userInConversation});
    }
}

const updateChatHistoryIfSameCoversationActive=({participants,messages, userInConversation})=>{
    const result=participants.every((partiId)=>{
        return userInConversation.includes(partiId);
    });

    if(result)
    {
        store.dispatch(chatAction.setMessages(messages));
    }
}

export default updateChatHistoryOfUser;