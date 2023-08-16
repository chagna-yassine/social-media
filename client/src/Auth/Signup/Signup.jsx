import React, { useEffect, useState} from 'react'
import './Signup.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'
import { handleViewPassword } from '../AuthFunctionalities'
import { useTranslation } from 'react-i18next'

const Signup = () => {

  const [ t ] = useTranslation("global")

  const [eyeIcon,setEyeIcon] = useState(faEye);
  const [confirmEyeIcon,setConfirmEyeIcon] = useState(faEye);

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  useEffect(()=>{
    handleBgImgs(currentDisplayMode,"Signup","Signup");
  },[currentDisplayMode]);

  useEffect(()=>{
    document.title = t("signup.label");
  },[t])
  
  return (
    <div id='Signup-container' className='Signup'>
        <img id='Signup' loading='lazy' src='' alt="Signup" />
        <div className={`Welcome-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <h1 className='title'>
              <span>{t("welcome")}</span> 
              <span>{t("to")}</span> 
              <span className='App-name'>app name</span>
            </h1>
        </div>
        <div className={`Auth-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
            <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("signup.label")}</h2>
            <form className='Form'>
              <div className="Info">
                <div className="Col">
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="firstName">{t("signup.form-label-fname")}</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='firstName' type="text" />
                      </div>
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="lastName">{t("signup.form-label-lname")}</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='lastName' type="text" />
                      </div>
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="age">{t("signup.form-label-age")}</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='age' type="number" />
                      </div>
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="phone">{t("signup.form-label-tel")}</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='phone' type="tel" />
                      </div>
                  </div>
                </div>
                <div className="Col">
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="email">{t("signup.form-label-mail")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='email' type="email" />
                        </div>
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="username">{t("signup.form-label-user")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='username' type="text" />
                        </div>
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="signup-password">{t("signup.form-label-pwd-1")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='signup-password' type="password" />
                          <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{setEyeIcon(handleViewPassword("signup-password"))}}/>
                        </div>
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="confirm-signup-password">{t("signup.form-label-pwd-2")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='confirm-signup-password' type="password" />
                          <FontAwesomeIcon className='Input-icon' icon={confirmEyeIcon} onClick={()=>{setConfirmEyeIcon(handleViewPassword("confirm-signup-password"))}}/>
                        </div>
                    </div>
                </div>
              </div>
              <div className='Submition'>
                 <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="submit" value={t("signup.submit")}/>
                 <Link className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} to="/login">{t("signup.link")}</Link>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Signup