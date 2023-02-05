import classes from '../messanger.module.css'
import { useSelector } from "react-redux"
import MessageHeader from './MessageHeader';
import Message from './Message';
import DateSeprator from './DateSeprator';

const convertDate=(date,format)=>{
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear(),
      };    
      return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}
const Messages=()=>{
    const userDetail=useSelector(state=>state.chat.chosenChatDetails);
    const messages=useSelector(state=>state.chat.messages);
    const image=useSelector(state=>state.user.profileImage);
  //  console.log(messages);
    return(
        <div className={classes.message_wraper}>
            <MessageHeader name={userDetail?.name} mail={userDetail?.email} firstTime={messages.length===0} profileImage={userDetail.profileImage}/>
            {
                messages.map((msg,index)=>{
                    const sameAuthor=(index > 0) && messages[index].authorId === messages[index-1].authorId;

                    const sameDay=(index > 0) && convertDate(new Date(messages[index].date),"dd/mm/yy") === convertDate(new Date(messages[index-1].date),"dd/mm/yy");

                    const username=(msg.authorId===userDetail?._id)?userDetail?.name : localStorage.getItem('username');
                    const profileImage=(msg.authorId===userDetail?._id) ? userDetail?.profileImage : image;
                    const date=convertDate(new Date(),"dd/mm/yy");
                    let renderDate=convertDate(new Date(messages[index].date),"dd/mm/yy");
                    if(date===convertDate(new Date(messages[index].date),"dd/mm/yy"))
                    {
                        renderDate="Today";
                    }
                    return(
                        <div key={msg._id} style={{width:'97%'}}>
                            {
                                !sameDay &&
                                <DateSeprator date={renderDate}/>
                            }
                            <Message 
                            content={msg.content}
                            username={username}
                            sameAuthor={sameAuthor}
                            date={convertDate(new Date(msg.date),"dd/mm/yy")}
                            time={msg.time}
                            sameDay={sameDay}
                            profileImage={profileImage}
                        />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Messages;