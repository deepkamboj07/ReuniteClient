
export function UpdateImageofProfile(token, image){
    const sendReq=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/updateProfileImage',{
            method:'POST',
            body:JSON.stringify({
                updateImage:image
            })
            ,headers:{
                'Authorization':'Bearer '+token,
                'Content-Type':'application/json'
            }
        })
        return response.json();
    }
    try{
        return sendReq();
    }catch(err){
        return err.json();
    }
}

