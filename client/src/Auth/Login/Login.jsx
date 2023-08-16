import React, { useEffect, useState } from 'react'
import './Login.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'
import { handleViewPassword } from '../AuthFunctionalities'


const Login = () => {
  const [eyeIcon,setEyeIcon] = useState(faEye);
  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';
  //To stop the component from loading twice
  let isCanceled = false;
  useEffect(()=>{
    if(!isCanceled){
      document.title = "Login";
      handleBgImgs(currentDisplayMode,"Login","Login");
    }
    return ()=>{
      isCanceled = true;
    }
  },[currentDisplayMode])
  return (
    <div className='Login'>
      <img id='Login' loading='lazy' src="" alt="Login" />
        <div className={`Welcome-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <h1 className='title'>
              <span>welcome</span> 
              <span>to</span> 
              <span className='App-name'>app name</span>
            </h1>
        </div>
        <div className={`Auth-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
            <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>login</h2>
            <form className='Form'>
              <div>
                  <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="username">username</label>
                  <div className='Input-container'>
                    <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="login-password">password</label>
                  <div className='Input-container'>
                    <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='login-password' type="password" />
                    <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{setEyeIcon(handleViewPassword("login-password"))}}/>
                  </div>
              </div>
              <div className='Submition'>
                 <a className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} href="">Forgot password?</a>
                 <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="submit" value="submit"/>
                 <Link className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} to="/signup">Don't have an account?</Link>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login;