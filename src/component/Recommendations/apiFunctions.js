export const userIntrestFetch=(token)=>{
    const send=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/userIntrest',{
            headers:{
                'Authorization':'Bearer '+token,
            }
        })
        return response.json();
    }
    try{
        return send();
    }catch(err){
        return err.json();
    }
}