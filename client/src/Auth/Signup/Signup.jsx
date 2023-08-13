import React, { useEffect, useState } from 'react'
import './Signup.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'

const Signup = () => {
  const [eyeIcon,setEyeIcon] = useState(faEye);
  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';
  //To stop the component from loading twice
  let isCanceled = false;
  useEffect(()=>{
    if(!isCanceled){
      document.title = "Signup";
      handleBgImgs(currentDisplayMode);
    }
    return ()=>{
      isCanceled = true;
    }
  },[currentDisplayMode])
  return (
    <div id='Login' className='Signup'>
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
                  <label className='Form-label' htmlFor="username">first name</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="username">last name</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="username">age</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="username">phone</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="username">email</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="username">username</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='username' type="text" />
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="password">password</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='password' type="password" />
                    <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{/* setEyeIcon(handleViewPassword()) */}}/>
                  </div>
              </div>
              <div>
                  <label className='Form-label' htmlFor="password">password</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='password' type="password" />
                    <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{/* setEyeIcon(handleViewPassword()) */}}/>
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

export default Signup