import { Fragment, useState } from "react";
import Login from "../component/Authentication/Login";
import Registration from "../component/Authentication/Registration";
import Animate from "../component/Authentication/Animate";
import { sendUserData } from '../component/Authentication/auth';
import Intrest from "../component/Authentication/intrest";
function Authentication(props){
    const [log,setLog]=useState(true);
    const [animation, setanimation]=useState(false);
    const [showIntrest, setIntrest]=useState(false);
    const [userId,setId]=useState("");
    const [loginSuc,setLoginSuc]=useState(false);

    const logHandler=()=>{
        setanimation(true);
        setTimeout(()=>{
            setanimation(false);
        },1300);
        setLog(!log);
    }
    const logHandler2=()=>{
        setLog(!log);
    }

    const userHandler=(data)=>{
        const promise=sendUserData(data);
        promise.then(result=>{
            if(result.status===201)
            {
                setTimeout(()=>{
                    setId(result._id);
                    setIntrest(true);
                },500);
            }
        });
        return promise;
    }

    const loginSucHandler=()=>{
        setLoginSuc(true);
    }

    return(
        <Fragment>
            {animation && <Animate/>}
            {log && !animation && <Login SignUp={logHandler} redirect={props.redirectHandl} suc={loginSuc} autoLogout={props.autoLogout}/>}
            {!log && !animation && !showIntrest &&<Registration SignUp={logHandler2} register={userHandler}/>}
            {!log && showIntrest && <Intrest userid={userId} SignUp={logHandler2} sucess={loginSucHandler}/>}
        </Fragment>
    )
}

export default Authentication;