import classes from './Registration.module.css';
import ig from '../../assets/reunit.png';
import loader from '../../assets/logo_loader.png';
import { useState } from 'react';
function Registration(props){
    const cl='container-fluid '+classes.tmp;
    const [name, setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpass]=useState("");
    const [confirmpass,setpass2]=useState("");
    const [errorText,setErrorText]=useState("");
    const [error,setError]=useState(false);
    const [perror,setperror]=useState(false);
    const [cofError,setConfError]=useState(false);
    const [EError,setEError]=useState(false);
    const [loadRegister,setLoadRegister]=useState(false);
    const [sucess,setSucess]=useState(false);

    const errorHandler=(err)=>{
        setErrorText(err);
    }
    const nameHandler=(event)=>{
        //console.log(event.target.value);
        setname(event.target.value);
    }
    const emailHandler=(event)=>{
        setemail(event.target.value);
        setError(false);
        setEError(false);
    }
    const passHandler=(event)=>{
        if(event.target.value.length>=6)
        {
            setError(false);
            setperror(false);
        }
        else
        {
            setperror(true);
        }
        setpass(event.target.value);
    }
    const confirmHandler=(event)=>{
        if(event.target.value === password)
        {
            setError(false);
            setConfError(false);
        }
        else{
            setConfError(true);
        }
        setpass2(event.target.value);
    }
    const formHandler=(event)=>{
        event.preventDefault();
        const userData={
            name:name.trim(),
            email:email.trim(),
            password:password
        }
        if(password.length < 6)
        {
            setperror(true);
            setError(true);
            errorHandler("Password is too short");
            return;
        }
        if(confirmpass!==password)
        {
            setError(true);
            setperror(false);
            setConfError(true);
            errorHandler("Password Not Matched");
            return;
        }
        
        setLoadRegister(true);
        const promise=props.register(userData);
        promise.then(d=>{
            if(d.status!==201)
            {
               if(d.message==='Invalid value')
               {
                    setLoadRegister(false);
                    setErrorText("Email is Not Valid");
                    setError(true);
                    setEError(true);
                    setSucess(false);
                    return;
               }
               setLoadRegister(false);
               setErrorText(d.message);
               setError(true);
               setSucess(false);
               return;
            }
            else{
                setError(false);
                setSucess(true);
                setLoadRegister(false);
                setemail("");
                setpass("");
                setname("");
                setpass2("");
            }
        })
    }


    return(
            <div className={cl}>
                <div className='row'>
                    <div className='col-md-7'>
                    <div className={classes['containerr']}>
                            <div className={classes.login + " " +classes.form}>
                                 <h1>Registeration</h1><h4>Let's start</h4><br/>
                                 {loadRegister && <div className={classes.loader}>
                                    <img src={loader} alt="loader"/>
                                 </div>}
                                <form method='POST' onSubmit={formHandler}>
                                    <label className={`${loadRegister && classes.labelopacity}`}>Name</label>
                                    <input value={name} type="text" onChange={nameHandler} placeholder="Enter your name"  className={`${classes.inputClass}  ${loadRegister && classes.inputopacity}`} required/>
                                    <label className={`${loadRegister && classes.labelopacity}`}>Email</label>
                                    <input value={email} type="email" onChange={emailHandler} placeholder="Enter your email" className={`${classes.inputClass} ${loadRegister && classes.inputopacity} ${EError && classes.passError}`} required/>
                                    <label className={`${loadRegister && classes.labelopacity}`}>Password</label>
                                    <input value={password} type="password" onChange={passHandler} placeholder="Enter Password" className={`${classes.inputClass} ${loadRegister && classes.inputopacity} ${perror && classes.passError}`} required/>
                                    <label className={`${loadRegister && classes.labelopacity}`}>Confirm Password</label>
                                    <input value={confirmpass} type="password" onChange={confirmHandler} placeholder="Confirm Password" className={`${classes.inputClass} ${loadRegister && classes.inputopacity} ${cofError && classes.passError}`}  required/>
                                    
                                    <div className={classes.error}>
                                        {error && <label className={classes.err}>{errorText}</label>}
                                        {sucess && <label className={classes.suc}>Registration Sucessfull</label>}
                                    </div>
                                    <input type="submit" className={`${classes.button} ${loadRegister && classes.buttonopacity}`} value="Register"/>         
                                </form>
                        
                                <div className={classes.signup}>
                                    <span onClick={props.SignUp} className={`${classes.signup} ${loadRegister && classes.labelopacity}`}>Have an account ?  SignIn 
                                    </span>
                                </div>

                                <div className={classes.withGoogle}>
                                    <p>OR</p>
                                    <button className={classes['googleBtn']}><svg data-v-3c75cee5="" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48"><g data-v-3c75cee5=""><path data-v-3c75cee5="" fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path> <path data-v-3c75cee5="" fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path> <path data-v-3c75cee5="" fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path> <path data-v-3c75cee5="" fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path> <path data-v-3c75cee5="" fill="none" d="M0 0h48v48H0z"></path></g></svg>Continue with Google</button>
                                </div>
                            </div>      
                        </div>
                    </div>

                    <div className='col-md-5'>
                        <div className={classes.logocnt}>
                            <img src={ig} alt="Reunite"/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Registration;