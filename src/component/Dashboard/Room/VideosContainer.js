import classes from './room.module.css';
import Video from './Video';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const VideosContainer=()=>{
    const localStream=useSelector(state=> state.room.localStreams);
    const screenSharingStream= useSelector(state=> state.room.screanSharingStream);
    const remoteStream=useSelector(state=> state.room.remoteStreams);
    console.log(remoteStream);
    const length=remoteStream.length;
    const [videoBig, setVideoBig]=useState(false);
    const videoResizeHandler=()=>{
        setVideoBig(!videoBig);
    }
    return(
        <div className={`${length>=2 && classes.videoContainer}  ${length===0 && classes.singleContainer} ${length===1 && classes.twoUserContainer} ${videoBig && classes.hideAnotherVideo}`}>
            <Video stream={screenSharingStream ? screenSharingStream : localStream} isLocalStram={localStream} resize={videoResizeHandler}/>
            {
                remoteStream.map(stream=>(
                    <Video stream={stream} key={stream.id} id={stream.id} resize={videoResizeHandler}/>
                ))
            }
        </div>
    )
}
export default VideosContainer;