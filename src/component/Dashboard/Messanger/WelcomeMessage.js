import { Typography } from "@mui/material";
import classes from './messanger.module.css';

const WelcomeMessage=()=>{
    return(
        <div className={classes.welcomeWraper}>
            <Typography
             sx={{color:'white'}}>To start chatting - choose conversation</Typography>
        </div>
    )
}
export default WelcomeMessage;