
export function sendFriendInvitations(userId,recevierId,token){
    const send= async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/friend/invite-friend',{
            method:'POST',
            body:JSON.stringify({
                senderId:userId,
                recevierId:recevierId
            }),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        });
        return response.json();
    }

    try{
        return send();
    }catch(err){
        return err.json();
    }
}



export function validateUserThroughEmail(email,token){
    const sendRequest=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/validateEmail',{
            method:'POST',
            body:JSON.stringify({
                email:email
            }),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
        return response.json();
    }

    try{
        return sendRequest();
    }catch(err){
        return err.json();
    }
}

export function rejectInvitation(id,token){
    const sendRequest=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/friend/reject-invitation',{
            method:'POST',
            body:JSON.stringify({
                id:id
            }),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
        return response.json();
    }

    try{
        return sendRequest();
    }catch(err){
        return err.json();
    }
}

export function acceptInvitation(id,token,senderId){
    const sendRequest=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/friend/accept-invitation',{
            method:'POST',
            body:JSON.stringify({
                id:id,
                senderId:senderId
            }),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
        return response.json();
    }

    try{
        return sendRequest();
    }catch(err){
        return err.json();
    }
}