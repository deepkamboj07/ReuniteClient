import { roomAction } from "../store/createRoomStore";
import store from "../store/store";
import Peer from 'simple-peer';
import { signalPeerData } from "./socketConnection";

const getConfiguration=()=>{
    const turnIceServer=null;
    if(turnIceServer){

    }else{
        console.warn('Using Only STUN Server');
        return{
            iceServers:[
                {
                    urls:'stun:stun.l.google.com.19302'
                }
            ]
        }
    }
};

const onlyAudioConstraints={
    audio:true,
    video:false
}
const defaultConstraints={
    audio:true,
    video:true
}
export const getLocalStramPreview=(onlyAudio=false,callback)=>{
    const constraints= onlyAudio ? onlyAudioConstraints : defaultConstraints;
    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
        store.dispatch(roomAction.setLocalStream(stream));
        callback();
    }).catch(err=>{
        console.log(err);
    })
}

let peers={};
export const prepareNewPeerConection=(conectedUserSocketId, isInitiator)=>{
    const localStream=store.getState().room.localStreams;
    if(isInitiator)
    {
        console.log('initiator');
    }
    else console.log('joining ');

    peers[conectedUserSocketId]=new Peer({
        initiator:isInitiator,
        config:getConfiguration(),
        stream:localStream,
    })
    peers[conectedUserSocketId].on('signal',data=>{
        const signalData={
            signal:data,
            conectedUserSocketId:conectedUserSocketId
        }
        signalPeerData(signalData);
    })

    peers[conectedUserSocketId].on('stream',remoteStream=>{
        remoteStream.conectedUserSocketId=conectedUserSocketId;
        addNewRemoteStream(remoteStream);
    })
}

export const handlingSignalingData=(data)=>{
    const signal=data.signal;
    const conectedUserSocketId=data.conectedUserSocketId;

    if(peers[conectedUserSocketId])
    {
        peers[conectedUserSocketId].signal(signal);
    }
}

const addNewRemoteStream=(remoteStream)=>{
    const remoteStreams=store.getState().room.remoteStreams;
    const newRemoteStreams=[...remoteStreams,remoteStream];
    store.dispatch(roomAction.setRemoteStream(newRemoteStreams));
}

export const closeAllConnection=()=>{
    Object.entries(peers).forEach((mapedObject)=>{
        const connectedUserSocketId =mapedObject[0];
        if(peers[connectedUserSocketId]){
            peers[connectedUserSocketId].destroy();
            delete peers[connectedUserSocketId];
        }
    })
}

export const handleParticipantsLeaveRoom=(data)=>{
    const connectedUserSocketId= data.connectedUserSocketId;

    if(peers[connectedUserSocketId]){
        peers[connectedUserSocketId].destroy();
        delete peers[connectedUserSocketId];
    }

    const remoteStreams=store.getState().room.remoteStreams;
    const newRemoteStreams=remoteStreams.filter((f)=>
        f.conectedUserSocketId!==connectedUserSocketId
    );

    store.dispatch(roomAction.setRemoteStream(newRemoteStreams));
}

export const switchOutGoingTracks=(stream)=>{
    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
          for (let index2 in stream.getTracks()) {
            if (
              peers[socket_id].streams[0].getTracks()[index].kind ===
              stream.getTracks()[index2].kind
            ) {
              peers[socket_id].replaceTrack(
                peers[socket_id].streams[0].getTracks()[index],
                stream.getTracks()[index2],
                peers[socket_id].streams[0]
              );
              break;
            }
          }
        }
      }
}