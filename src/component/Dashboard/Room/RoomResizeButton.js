import classes from './room.module.css';
import CloseFullScreen from '@mui/icons-material/CloseFullscreen'
import OpenFullScreen from '@mui/icons-material/OpenInFull'

const RoomResizeButton=(props)=>{
    return(
        <div className={classes.resizeBtnCont}>
            <button onClick={props.resizeHandler}>
                {props.minimized ? <OpenFullScreen/> : <CloseFullScreen/>}
            </button>
        </div>
    )
}
export default RoomResizeButton;