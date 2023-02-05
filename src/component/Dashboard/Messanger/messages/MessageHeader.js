import classes from '../messanger.module.css'
import AvtarPreview from '../../../compo/AvtarPreview';
import { Typography } from '@mui/material';
const MessageHeader=(props)=>{
    return(
        <div className={classes.message_header}>
            <AvtarPreview src={`https://reuniteserverr.onrender.com/${props.profileImage}`} Big={true}/>
            <Typography
            variant='h4'
            sx={{fontWeight:'bold', color:'white' ,margin:'4px 8px' , fontSize:'24px'}}>
                {props.name}
            </Typography>
            <Typography
            variant='h4'
            sx={{color:'#b9bbbe;' ,marginTop:'-2px', marginLeft:'8px' , fontSize:'11px'}}>
                {props.mail}
            </Typography>

            { props.firstTime && (<Typography
            sx={{color:'#b9bbbe;' ,marginTop:'20px', marginLeft:'8px' , fontSize:'15px', width:'100%', textAlign:'center'}}>
                This is the beginning of your conversation with {props.name}
            </Typography>)}
            {
                props.firstTime && (
                    <div className={classes.firstHii}>
                        Say Helloo! <span>👋</span>
                    </div>
                )
            }


        </div>
    )
}
export default MessageHeader;