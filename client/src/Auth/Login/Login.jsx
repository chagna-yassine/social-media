import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'
import { handleViewPassword } from '../AuthFunctionalities'
import { useTranslation } from 'react-i18next'
import { login } from '../../api';


const Login = () => {
  // variable for the usename and paswword input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authErr, setAuthErr] = useState('');

  const navigate = useNavigate();

  //Declare user cookies
  const [userCookies,setUserCookies] = useCookies(['token']);

  // function that send data to the api file for authentification
  const handleLogin = async () => {
    try {
      const response = await login({ username, password });

      //Check if there is an err 
      if(response.errName === "Incorrect"){
        setAuthErr(<p className='alert alert-danger err'>Username Or Password Incorrect</p>);
      }else{ // create user cookies and rederect him to the main if there is no err
          setUserCookies('token',response.token);
          navigate('/');
      }
      console.log(response); // Handle success or display error message
    } catch (error) {
      console.error(error);
    }
  };

  const [ t ] = useTranslation("global")

  const [eyeIcon,setEyeIcon] = useState(faEye);

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  useEffect(()=>{
      handleBgImgs(currentDisplayMode,"Login","Login");
  },[currentDisplayMode])

  useEffect(()=>{
    document.title = t("login.label");

    //Check if the user loged in and rederect him to the main
    if(userCookies.token){
        navigate("/");
    }
  },[t,navigate,userCookies.token])

  return (
    <div className='Login'>
      <img id='Login' loading='lazy' src="" alt="Login" />
        <div className={`Welcome-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <h1 className='title'>
              <span>{t("welcome")}</span> 
              <span>{t("to")}</span> 
              <span className='App-name'>app name</span>
            </h1>
        </div>
        <div className={`Auth-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
            <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("login.label")}</h2>
            <form className='Form'>
              {authErr}
              <div>
                  <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="username">{t("login.form-label-user")}</label>
                  <div className='Input-container'>
                    <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </div>
              </div>
              <div>
                  <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="login-password">{t("login.form-label-pwd")}</label>
                  <div className='Input-container'>
                    <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='login-password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{setEyeIcon(handleViewPassword("login-password"))}}/>
                  </div>
              </div>
              <div className='Submition'>
                 <a className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} href="/login">{t("login.forgot-pwd")}</a>
                 <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="button" value={t("login.submit")} onClick={handleLogin}/>
                 <Link className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} to="/signup">{t("login.link")}</Link>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login;