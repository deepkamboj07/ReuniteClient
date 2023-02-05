import classes from './room.module.css';
import RoomResizeButton from './RoomResizeButton';
import { useState } from 'react';
import VideosContainer from './VideosContainer';
import RoomButtons from './RoomButtons/RoomButtons';
const Room=()=>{
    const [isRoomMinimized, setRoomMinimized]=useState(true);
    const roomResizeHandler=()=>{
        setRoomMinimized(!isRoomMinimized);
    }
    return(
        <div className={`${(isRoomMinimized)? classes.minimized : classes.fullScreen}`}>
            <VideosContainer/>
            <RoomButtons/>
            <RoomResizeButton minimized={isRoomMinimized} resizeHandler={roomResizeHandler}/>
        </div>
    )
}
export default Room;