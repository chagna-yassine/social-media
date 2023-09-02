import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'
import { handleViewPassword } from '../AuthFunctionalities'
import { useTranslation } from 'react-i18next'
import { checkExistence, login } from '../../api';


const Login = () => {
  // variable for the usename and paswword input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authErr, setAuthErr] = useState('');

  const [ t ] = useTranslation("global")

  const navigate = useNavigate();

  //To handle if the user click the login button or not
  const [isClicked,setIsClicked] = useState(false);

  //Declare user cookies
  const [userCookies,setUserCookies] = useCookies(['token']);
  const [userIdCookies,setUserIdCookies] = useCookies(['userId']);
  const [userNameCookies,setUserNameCookies] = useCookies(['username']);

  // function that send data to the api file for authentification
  //Use a callback hook to prevend multiple rerender in the useEffect hook
  const handleLogin = useCallback(async () => {
    try {
      const response = await login({ username, password });
      //Check if there is an err 
      if(response.errName === "Incorrect"){
        setAuthErr(<p className='alert alert-danger err'>{t('login.Errs.authErr')}</p>);
      }else{ // create user cookies and rederect him to the main if there is no err
          setUserCookies('token',response.token);
          setUserIdCookies('userId',response.id);
          setUserNameCookies('username',response.username)
          navigate('/');
      }
      console.log(response); // Handle success or display error message
    } catch (error) {
      console.error(error);
    }
  },[username,password,setAuthErr,t,setUserCookies,setUserIdCookies,setUserNameCookies,navigate])

  const [eyeIcon,setEyeIcon] = useState(faEye);

  //Handle displayMode
  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

   //handle the bg imgs when the component rerender
  useEffect(()=>{
      handleBgImgs(currentDisplayMode,"Login","Login");
  },[currentDisplayMode])

  //a useEffect hook that handle the document title and the existens of the userCookies 
  useEffect(()=>{
    document.title = t("login.label");
    //Check if the user loged in and rederect him to the main
    const checkUserInfo = async()=>{
      if(userCookies.token && userIdCookies.userId && userNameCookies.username){
        const response = await checkExistence({userId: userIdCookies.userId , username : userNameCookies.username})
          console.log(response);
        if(response.isExist){
          navigate("/");
        }
      }
    }
    checkUserInfo();
    //Call the handleLogin function when the user click the login button to handle language change on render
    isClicked && handleLogin();
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,handleLogin,isClicked])

  return (
    <div className='Login'>
      <img id='Login' loading='lazy' src="" alt="Login" />
        <div className={`Welcome-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <h1 className='title'>
              <span>{t("welcome")}</span> 
              <span>{t("to")}</span> 
              <span className='App-name'>Fire Camp</span>
            </h1>
        </div>
        <div className={`Auth-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
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

                 <Link className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} to={"/Recovery"}>{t("login.forgot-pwd")}</Link>
                 <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="button" value={t("login.submit")} onClick={()=>{setIsClicked(true);handleLogin()}}/>
                 <Link className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} to="/signup">{t("login.link")}</Link>

              </div>
            </form>
        </div>
    </div>
  )
}

export default Login;