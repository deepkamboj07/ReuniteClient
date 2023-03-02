import { Fragment } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Splashh from './component/splash/SplashScreen';
import Authentication from './pages/Authenticate';
import DashBoard from './pages/Dashboard';
import { logoutUser, validateUser } from './component/Authentication/auth';
import { connectWithSocketServer, disconnectUser } from './RealTimeCommunication/socketConnection';
import TicTac from './component/Recommendations/Game/TicTacToe/TicTac';
import SnakeGame from './component/Recommendations/Game/Snake/Snake';
function App() {

  const [authRedirect , setAuthRedirect]=useState(false);
  const [splash,setSplash]=useState(true);
  //const [logToken, setLogToken]=useState(null);
  useEffect(()=>{
    setSplash(true);
    setTimeout(() => {
      setSplash(false);
    }, 4200);
  },[]);

  useEffect(()=>{
    const id=localStorage.getItem('userId');
    if(id)
    {
       validateUser(id).then(result=>{
          if(result.status===200)
          {
              setAuthRedirect(true);
          }
       })
    }
  })

  const setUserHandler=(userDetail)=>{
    setAuthRedirect(true);
    connectWithSocketServer(userDetail);
  }

  const logoutHandler = () => {
    //setLogToken(null);
    logoutUser(localStorage.getItem('userId')).then(res=>{
        if(res.status===200)
        {
          setAuthRedirect(false);
          localStorage.removeItem('token');
          localStorage.removeItem('expiryDate');
          localStorage.removeItem('userId');
          disconnectUser();
        }
    });
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  return (
    <Routes> 
    <Route path="/" exact element={
      <Fragment>
          {splash && <Splashh/>}
          {!splash && !authRedirect && <Navigate to="/auth" replace/>}
          {!splash && authRedirect && <Navigate to="/Dashboard" replace/>}
      </Fragment>
    }/>
    <Route path='/auth' exact element={
      <Fragment>
        {!authRedirect && <Authentication redirectHandl={setUserHandler} autoLogout={setAutoLogout}/>}
        {authRedirect && <Navigate to="/Dashboard" replace/>}
      </Fragment>
    }/>
    {
      authRedirect && <Route path='/Dashboard' exact element={
      <DashBoard logout={logoutHandler} open={authRedirect}/>}/>
    }
    {
      !authRedirect && <Route path='/Dashboard' exact element={
        <Navigate to="/auth" replace/>
      }/>
    }
    {
      authRedirect && <Route path='/Dashboard/game/tic-tac-toe' exact element={
        <TicTac open={true}/>
      }/>
    }
    {
      authRedirect && <Route path='/Dashboard/game/space-snake' exact element={
        <SnakeGame/>
      }/>
    }

    <Route path="*" element={<Fragment>
          {splash && <Splashh/>}
          {!splash && !authRedirect && <Navigate to="/auth" replace/>}
          {!splash && authRedirect && <Navigate to="/Dashboard" replace/>}
      </Fragment>}/>
  </Routes>
  );
}

export default App;
