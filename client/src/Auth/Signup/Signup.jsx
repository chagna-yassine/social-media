import React, { useEffect, useState } from 'react'
import './Signup.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'
import { handleViewPassword } from '../AuthFunctionalities'

const Signup = () => {
  const [eyeIcon,setEyeIcon] = useState(faEye);
  const [confirmEyeIcon,setConfirmEyeIcon] = useState(faEye);
  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';
  //To stop the component from loading twice
  let isCanceled = false;
  useEffect(()=>{
    if(!isCanceled){
      document.title = "Signup";
      handleBgImgs(currentDisplayMode,"Signup","Signup");
    }
    return ()=>{
      isCanceled = true;
    }
  },[currentDisplayMode])
  
  return (
    <div id='Signup-container' className='Signup'>
        <img id='Signup' loading='lazy' src='' alt="Signup" />
        <div className={`Welcome-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <h1 className='title'>
              <span>welcome</span> 
              <span>to</span> 
              <span className='App-name'>app name</span>
            </h1>
        </div>
        <div className={`Auth-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
            <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>signup</h2>
            <form className='Form'>
              <div className="Info">
                <div className="Col">
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="firstName">first name</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='firstName' type="text" />
                      </div>
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="lastName">last name</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='lastName' type="text" />
                      </div>
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="age">age</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='age' type="number" />
                      </div>
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="phone">phone</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='phone' type="tel" />
                      </div>
                  </div>
                </div>
                <div className="Col">
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="email">email</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='email' type="email" />
                        </div>
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="username">username</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='username' type="text" />
                        </div>
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="signup-password">password</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='signup-password' type="password" />
                          <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{setEyeIcon(handleViewPassword("signup-password"))}}/>
                        </div>
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="confirm-signup-password">confirm password</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='confirm-signup-password' type="password" />
                          <FontAwesomeIcon className='Input-icon' icon={confirmEyeIcon} onClick={()=>{setConfirmEyeIcon(handleViewPassword("confirm-signup-password"))}}/>
                        </div>
                    </div>
                </div>
              </div>
              <div className='Submition'>
                 <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="submit" value="signup"/>
                 <Link className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} to="/login">Already have an account?</Link>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Signup