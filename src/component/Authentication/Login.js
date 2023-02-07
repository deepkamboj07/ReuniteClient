import classes from './Login.module.css';
import ig from '../../assets/reunit.png';
import loader from '../../assets/logo_loader.png';
import { checkCredential, extractUserInfo , userEmailVerified} from './auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { userAction } from '../../store/userStore';
import { userIntrestFetch } from '../Recommendations/apiFunctions';

//const token=localStorage.getItem('token');
function Login(props){
    const cl='container-fluid '+classes.tmp;
    const dispatch=useDispatch();
    let navigate = useNavigate();
    const[email, setEmail]=useState("");
    const[Password, setPassword]=useState("");
    const[error,setError]=useState(false);
    const[errorText,setErrorText]=useState("");
    const[PError,setperror]=useState(false);
    const[EError,setEError]=useState(false);
    const[loadRegister,setLoadRegister]=useState(false);
  

    const emailHandler=(event)=>{
        if(errorText==='Email is Required' || errorText==='EMAIL NOT FOUND'){
            setEError(false);
            setError(false);
        }
        setEmail(event.target.value);
    }
    const passHandler=(event)=>{
        if(errorText==='Password is Required' || errorText==='INVALID PASSWORD'){
            setperror(false);
            setError(false);
        }
        setPassword(event.target.value);
    }
    const formHandler=(event)=>{
        event.preventDefault();
        if(email.length===0)
        {
            setEError(true);
            setError(true);
            setErrorText("Email is Required");
            return;
        }
        if(Password.length===0)
        {
            setperror(true);
            setError(true);
            setErrorText("Password is Required");
            return;
        }
        setLoadRegister(true);
        const check=checkCredential(email.trim(),Password.trim());
        check.then(p=>{
            if(p.status!==200)
            {
                setLoadRegister(false);
                const text = p.message;
                setErrorText(text);
                setError(true);
                if(text==='Email is not registered')
                {
                    setEError(true);
                }
                else if(text==='Password is incorrect')
                {
                    setperror(true);
                }
            }
            else
            {               
                 userEmailVerified(email).then(promiseVerified=>{
                    if(promiseVerified.status===200)
                    {
                            const userDetail={
                                token:p.token,
                                username:p.username,
                                email:p.email,
                                userid:p.user_id,
                                profileImage:p.profileImage
                            }
                            props.redirect(userDetail);
                            dispatch(userAction.setUserDetails({email:userDetail.email, userid:userDetail.userid, profileImage:userDetail.profileImage, username:userDetail.username}));
                            userIntrestFetch(p.token).then(result=>{
                                if(result.status==='200' && result?.intrest)
                                {
                                 //   console.log(result.intrest);
                                    dispatch(userAction.setIntrest(result.intrest));
                                }
                                else{
                                    console.log(result);
                                }
                            });
                            localStorage.setItem('token', p.token);
                            localStorage.setItem('userId', p.user_id);
                            localStorage.setItem('email',p.email);
                            localStorage.setItem('username',p.username);
                            const remainingMilliseconds = 60*60*1000 * 5;
                            const expiryDate = new Date(
                                new Date().getTime() + remainingMilliseconds
                            );
                            localStorage.setItem('expiryDate', expiryDate.toISOString());
                            props.autoLogout(remainingMilliseconds);
                            navigate('/dashboard');   
                    }
                    else
                    {
                        const text = promiseVerified.message;
                        setErrorText(text);
                        setError(true);
                        setLoadRegister(false);
                    }
                 }).catch(err=>{
                    console.log(err);
                 })
                }
        })
    }
    return(
            <div className={cl}>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className={classes.logocnt}>
                            <img src={ig} alt="Reunite"/>
                        </div>
                    </div>

                    <div className='col-md-7'>
                        <div className={classes.containerr}>
                            <div className={classes.login + " " +classes.form}>
                                 <h1>Welcome</h1><h4>Let's connect in Virtual World</h4><br/>
                                 {loadRegister && <div className={classes.loader}>
                                    <img src={loader} alt="loader"/>
                                 </div>}
                                <form method='POST' onSubmit={formHandler}>
                                    <label className={`${loadRegister && classes.labelopacity}`} >Email</label>
                                    <input onChange={emailHandler} type="email" placeholder="Enter your email"  className={`${classes.inputClass}  ${loadRegister && classes.inputopacity} ${EError && classes.passError}`} />
                                    <label className={`${loadRegister && classes.labelopacity}`}>Password</label>
                                    <input onChange={passHandler} type="password" placeholder="Enter your password"  className={`${classes.inputClass}  ${loadRegister && classes.inputopacity} ${PError && classes.passError}`} />
                                    <div className={classes.rememberMe}>
                                        <p className={`${loadRegister && classes.labelopacity}`}>Forgot password?</p>
                                        <label className={`${loadRegister && classes.labelopacity}`}><input className={`${classes.check} ${loadRegister && classes.inputopacity}`} type="checkbox"/> RememberMe</label>
                                    </div>

                                    <div className={classes.error}>
                                        {error && <label className={classes.err}>{errorText}</label>}
                                    </div>
                                    <div className={classes.error}>
                                        {props.suc && <label className={classes.suc}>Registration sucessfull. verify your e-mail</label>}
                                    </div>

                                    <input type="submit" className={`${classes.button} ${loadRegister && classes.buttonopacity}`} value="Login"/>
                                </form>
                        
                                <div className={classes.signup}>
                                    <span onClick={props.SignUp} className={`${classes.signup} ${loadRegister && classes.labelopacity}`}>Don't have an account ?  Signup 
                                    </span>
                                </div>
                                <div className={classes.withGoogle}>
                                    <p>OR</p>
                                    <button className={classes['googleBtn']}><svg data-v-3c75cee5="" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48"><g data-v-3c75cee5=""><path data-v-3c75cee5="" fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path> <path data-v-3c75cee5="" fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path> <path data-v-3c75cee5="" fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path> <path data-v-3c75cee5="" fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path> <path data-v-3c75cee5="" fill="none" d="M0 0h48v48H0z"></path></g></svg>Continue with Google</button>
                                </div>
                            </div>      
                        </div>
                    </div>
                </div>
            </div>    
    )
}
export default Login;
        