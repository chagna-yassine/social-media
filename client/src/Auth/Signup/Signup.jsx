import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faPhoneFlip} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'
import { handleViewPassword } from '../AuthFunctionalities'
import { useTranslation } from 'react-i18next'
import { signup } from '../../api'
import { handleDataValidation } from './HandleSignup';

const Signup = () => {

  const [ t ] = useTranslation("global")

  const [eyeIcon,setEyeIcon] = useState(faEye);
  const [confirmEyeIcon,setConfirmEyeIcon] = useState(faEye);

  const navigate = useNavigate();

  //signup states
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [age,setAge] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirmedPassword,setConfirmedPassword] = useState('');

  //Signup states Errs
  const [isErr,setIsErr] = useState(false);
  const [firstNameErr,setFirstNameErr] = useState('');
  const [lastNameErr,setLastNameErr] = useState('');
  const [ageErr,setAgeErr] = useState('');
  const [phoneErr,setPhoneErr] = useState('');
  const [emailErr,setEmailErr] = useState('');
  const [usernameErr,setUsernameErr] = useState('');
  const [passwordErr,setPasswordErr] = useState('');
  const [confirmedPasswordErr,setConfirmedPasswordErr] = useState('');

  //Handle displayMode
  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);

  useEffect(()=>{
    handleBgImgs(currentDisplayMode,"Signup","Signup");
  },[currentDisplayMode]);

  useEffect(()=>{
    document.title = t("signup.label");
    //Check if the user loged in and rederect him to the main
    if(userCookies.token){
      navigate("/");
  }
  },[t])

  

  //function that handle the signup
  const handleSignup = async()=>{

    //Check if there is not an err by calling the validation function  to send data
    if(!handleDataValidation(
      firstName , setFirstNameErr,
      lastName , setLastNameErr,
      age , setAgeErr,
      phone , setPhoneErr,
      email , setEmailErr,
      username , setUsernameErr,
      password ,setPasswordErr,
      confirmedPassword , setConfirmedPasswordErr,
      isErr , setIsErr
    )){
      //create a new user
      const  newUser = {firstName,lastName,age,phone,email,username,password};
      try {
        //send the new user to the signup api
        const response = await signup(newUser);
        //Check if there is an err 
        if(response.errName === "PhoneErr"){
          setPhoneErr(<p className='alert alert-danger err'>Phone Already Existed</p>);
        }else if(response.errName === "EmailErr"){
          setEmailErr(<p className='alert alert-danger err'>Email Already Existed</p>);
        }else if(response.errName === "UsernameErr"){
          setUsernameErr(<p className='alert alert-danger err'>Username Already Existed</p>);
        }else{// Rederect user to the login if there is no err
            navigate('/login')
        }
        console.log(response); // Handle success or display error message
      } catch (error) {
        console.error(error);
      }
    }
  }
  
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
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='firstName' type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                      </div>
                      {firstNameErr}
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="lastName">{t("signup.form-label-lname")}</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='lastName' type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                      </div>
                      {lastNameErr}
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="age">{t("signup.form-label-age")}</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='age' type="number" min={13} max={99} value={age} onChange={(e)=>{setAge(e.target.value)}}/>
                      </div>
                      {ageErr}
                  </div>
                  <div>
                      <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="phone">{t("signup.form-label-tel")}</label>
                      <div className='Input-container'>
                        <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='phone' type="tel" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                      </div>
                      {phoneErr}
                  </div>
                </div>
                <div className="Col">
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="email">{t("signup.form-label-mail")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='email' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        {emailErr}
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="username">{t("signup.form-label-user")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='username' type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        </div>
                        {usernameErr}
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="signup-password">{t("signup.form-label-pwd-1")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='signup-password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                          <FontAwesomeIcon className='Input-icon' icon={eyeIcon} onClick={()=>{setEyeIcon(handleViewPassword("signup-password"))}}/>
                        </div>
                        {passwordErr}
                    </div>
                    <div>
                        <label className={`Form-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} htmlFor="confirm-signup-password">{t("signup.form-label-pwd-2")}</label>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='confirm-signup-password' type="password" value={confirmedPassword} onChange={(e)=>{setConfirmedPassword(e.target.value)}}/>
                          <FontAwesomeIcon className='Input-icon' icon={confirmEyeIcon} onClick={()=>{setConfirmEyeIcon(handleViewPassword("confirm-signup-password"))}}/>
                        </div>
                        {confirmedPasswordErr}
                    </div>
                </div>
              </div>
              <div className='Submition'>
                 <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="button" value={t("signup.submit")} onClick={handleSignup}/>
                 <Link className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} to="/login">{t("signup.link")}</Link>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Signup