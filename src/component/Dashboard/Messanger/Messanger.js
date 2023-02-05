import classes from './messanger.module.css';
import {useSelector} from 'react-redux'
import WelcomeMessage from './WelcomeMessage';
import MessangerContent from './MessagnerContent';
const Messanger=()=>{
    const userDetail=useSelector(state=>state.chat.chosenChatDetails);
    return(
        <div className={classes.messanger}>
            {
                !userDetail ? (<WelcomeMessage/>) : 
                (<MessangerContent userDetails={userDetail}/>)
            }
        </div>
    )
}
export default Messanger;