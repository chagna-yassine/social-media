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
      handleBgImgs(currentDisplayMode);
    }
    return ()=>{
      isCanceled = true;
    }
  },[currentDisplayMode])
  return (
    <div id='Login' className='Login'>
        <div className="Welcome-container">
            <h1 className='title'>
              <span>welcome</span> 
              <span>to</span> 
              <span className='App-name'>app name</span>
            </h1>
        </div>
        <div className="Auth-container">
          <div className="Logo"></div>
            <h2 className='Label'>login</h2>
            <form className='Form'>
              <div>
                  <label className='Form-label' htmlFor="username">username</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="login-password">password</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='login-password' type="password" />
                    <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{setEyeIcon(handleViewPassword("login-password"))}}/>
                  </div>
              </div>
              <div className='Submition'>
                 <a href="">Forgot password?</a>
                 <input type="submit" value="submit"/>
                 <Link to="/signup">Don't have an account?</Link>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login;