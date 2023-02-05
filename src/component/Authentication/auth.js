export function sendUserData(data){
   const sendData= async()=>{
    const response=await fetch('https://reuniteserverr.onrender.com/auth/registration',{
        method:'POST',
        body:JSON.stringify({
            name:data.name,
            email:data.email,
            password:data.password
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });
    //console.log(response.json());
    return response.json();
   }

   try{
    return sendData();
   }catch(err){
    return err.JSON();
   }
}

export function sendIntres(id,arrayOfIntrest){
    const sendData= async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/intrest',{
            method:'POST',
            body:JSON.stringify({
                id:id,
                intrest:arrayOfIntrest
            }),
            headers:{
                'Content-Type':'application/json'
            }
    });
    return response.json();
    }
    try{
        return sendData();
    }catch(err){
        return err.JSON();
    }
}

export function checkCredential(email, password){
    const fetchData=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/login',{
        method:'POST',
        body:JSON.stringify({
            email:email,
            password:password
        }),
        headers:{
            'Content-Type':'application/json'
        }
        });

        return response.json();
    }
    try{
        return fetchData();
    }
    catch(err){
        return err.JSON();
    }
}

export function validateUser(id){
    const sendReq=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/validate-user',{
            method:'POST',
            body:JSON.stringify({
                userid:id
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.json();
    }

    try{
        return sendReq();
    }catch(err){
        return err.json();
    }
}

export function extractUserInfo(token){
    const sendReq=async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/user_info',{
            headers:{
                'Authorization':'Bearer '+token
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

export function logoutUser(id){
    const send= async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/logout',{
            method:'POST',
            body:JSON.stringify({
                userid:id
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.json()
    }
    try{
        return send();
    }catch(err){
        return err.json();
    }
}

export function userEmailVerified(email){
    const send= async()=>{
        const response= await fetch('https://reuniteserverr.onrender.com/auth/is-user-email-verified',{
            method:'POST',
            body:JSON.stringify({
                email:email
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.json()
    }
    try{
        return send();
    }catch(err){
        return err.json();
    }
}