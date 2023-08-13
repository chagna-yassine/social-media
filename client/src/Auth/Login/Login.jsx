import React from 'react'
import './Login.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='Login'>
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
                  <input className='Form-input' id='username' type="text" />
              </div>
              <div>
                  <label className='Form-label' htmlFor="password">password</label>
                  <div className='Input-container'>
                    <input className='Form-input' id='password' type="password" />
                    <FontAwesomeIcon className='Input-icon' icon={faEye}/>
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