import { useSelector } from "react-redux"
import { Typography } from "@mui/material";
import TypingIndicator from "./TypingIndicator";
const ChoosenOptionLabel=()=>{
    const name=useSelector(state=> state.chat.chosenChatDetails?.name);
    const isTyping=useSelector(state=> state.chat.chosenChatDetails?.isTyping);
    
    //console.log(isTyping)
    return(
        <div style={{display:'flex', color:'white'}}>
            <Typography
        sx={{fontSize:'16px', color:'white', fontWeight:'bold', }}>
            {`${name ? name : ''}`} 
        </Typography>
            {isTyping && <TypingIndicator/>}
        </div>
    )
}
export default ChoosenOptionLabel;