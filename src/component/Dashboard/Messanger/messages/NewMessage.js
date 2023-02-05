import classes from './message.module.css';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { sendDirectMessage} from '../../../../RealTimeCommunication/socketConnection';
import { sendUserTyping } from '../../../../RealTimeCommunication/socketConnection';
const NewMessage=(props)=>{
    const [message, setMessage]=useState('');
    const [error , setError]=useState(true);

    const msgHanler=(event)=>{

        if(event.target.value.length === 0 || event.target.value.length >= 100)
        {
            setError(true);
            sendUserTyping({
                recevierId:props.id,
                senderId:localStorage.getItem('userId'),
                typing:false
            })
        }
        else
        {
            setError(false);
            sendUserTyping({
                recevierId:props.id,
                senderId:localStorage.getItem('userId'),
                typing:true
            })
        }
        setMessage(event.target.value);
    }
    const submitHandler=()=>{
        sendUserTyping({
            recevierId:props.id,
            senderId:localStorage.getItem('userId'),
            typing:false
        });
        if(message.length === 0 || message.length >= 100)
        {
            return;
        }

        sendDirectMessage({
            recevierId:props.id,
            content:message
        });
        // getdirectChatHistory({
        //     recevierId:props.id
        // })
        setMessage("");
        setError(true);
    }

    const handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            submitHandler();
        }
    };
    return(
        <div className={classes.newMessageCont}>
            <div className={classes.newInput}>
                <input type='text' placeholder={`Write message to ${props.name}`} onChange={msgHanler} value={message} onKeyDown={handleKeyPressed}/>
                <button className={`${error ? classes.sendBtn_err : classes.sendBtn }`} onClick={submitHandler}><SendIcon className={classes.icon}/></button>
            </div>
        </div>
    )
}
export default NewMessage;