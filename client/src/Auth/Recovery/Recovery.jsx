import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Recovery.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../../HandleBgImgs/handleBgImgs'
import { useTranslation } from 'react-i18next'
import { checkEmail, checkExistence, sendEmail, updatePassword } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleViewPassword } from '../AuthFunctionalities';
import { faEye } from '@fortawesome/free-regular-svg-icons';


const Recovery = () => {
  // variable for the usename and paswword input
  const [email, setEmail] = useState('');
  const [campCode, setCampCode] = useState('');
  const [authErr, setAuthErr] = useState('');
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [c3, setC3] = useState('');
  const [c4, setC4] = useState('');
  const [c5, setC5] = useState('');
  const [c6, setC6] = useState('');

  const [ t ] = useTranslation("global")

  const navigate = useNavigate();

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  const handleRecover = async () => {
    try {
      const response = await checkEmail(email);
      if(response.err === "notFound"){
        setAuthErr(<p className='alert alert-danger mt-3 w-50 m-auto text-center'>This email doesn't exist</p>);
      }else{
          const responseCode = await sendEmail({email, username:response.username});
          setCampCode(responseCode.CampCode)
      }
    } catch (error) {
      console.error(error);
    }
  }


  //Handle displayMode
  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';


   //handle the bg imgs when the component rerender
  useEffect(()=>{
      handleBgImgs(currentDisplayMode,"Recovery","Recovery");
  },[currentDisplayMode])

  //a useEffect hook that handle the document title and the existens of the userCookies 
  useEffect(()=>{
    document.title = "Recover";
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

  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,])

  const [isCorrect , setIsCorrect] = useState(false)
  const [campCodeErr , setCampCodeErr] = useState('')

  const handleCheckCode = ()=>{
      const entredCode = c1 + c2 + c3 + c4 + c5 + c6;
      if(parseInt(entredCode) === campCode){
        setIsCorrect(true)
      }else{
          setCampCodeErr(<p className='alert alert-danger mt-3 w-75 m-auto text-center'>This CampCode Incorrect</p>)
      }
  }
  
  const [password,setPassword] = useState('');
  const [confirmedPassword,setConfirmedPassword] = useState('');
  const [passwordErr,setPasswordErr] = useState('');
  const [confirmedPasswordErr,setConfirmedPasswordErr] = useState('');
  const [isErr,setIsErr] = useState(true);

  const [eyeIcon,setEyeIcon] = useState(faEye);
  const [confirmEyeIcon,setConfirmEyeIcon] = useState(faEye);

  const handePasswordValidity = ()=>{
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#&.\-_]).{8,16}$/
    //Password validation
    if(!password){
      setPasswordErr(<p className='alert alert-danger py-1 w-50 text-center m-auto mt-2'>{t('signup.Errs.passwordErr')}</p>);
      setIsErr(true);
    }else if(!passwordPattern.test(password)){
      setPasswordErr(<p className='alert alert-danger py-1 w-50 text-center m-auto mt-2'>{t('signup.Errs.invalidPasswordErr')}</p>);
      setIsErr(true);
    }else{
      setPasswordErr("");
      setIsErr(false);
    }

    //Confirmed password validation
    if(!confirmedPassword){
      setConfirmedPasswordErr(<p className='alert alert-danger py-1 w-50 text-center m-auto mt-2'>{t('signup.Errs.confirmedPasswordErr')}</p>);
      setIsErr(true);
    }else if(password !== confirmedPassword){
      setConfirmedPasswordErr(<p className='alert alert-danger py-1 w-50 text-center m-auto mt-2'>{t('signup.Errs.indenticalPasswordErr')}</p>);
      setIsErr(true);
    }else{
      setConfirmedPasswordErr("");
      return false
    }
    return isErr;
  }

  const handleUpdatePassword = async()=>{
    const isNotValid = handePasswordValidity();
    if(!isNotValid){
      try {
        await updatePassword({email , password});
        navigate('/login')
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className='Recovery'>
      <img id='Recovery' loading='lazy' src="" alt="Login" />
        <div className={`Auth-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            {
              !campCode ? (
                <>
                  <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Enter your email</h2>
                  <form className='Form'>
                    <div>
                        <div className='Input-container'>
                          <input className={`Form-input ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    {authErr}
                    <div className='Submition'>
                      <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="button" value={"Recover"} onClick={()=>{handleRecover()}}/>
                    </div>
                  </form>
                </>
              ): !isCorrect ?(
                <>
                  <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Enter your campCode</h2>
                  <div className='w-50 m-auto'>
                      <table>
                          <tr>
                            <td>
                              <input type="text" className="form-control text-center campcode" maxLength={1} value={c1} onChange={(e)=>{setC1(e.target.value)}}/>
                            </td>
                            <td>
                              <input type="text" className="form-control text-center campcode" maxLength={1} value={c2} onChange={(e)=>{setC2(e.target.value)}}/>
                            </td>
                            <td>
                              <input type="text" className="form-control text-center campcode" maxLength={1} value={c3} onChange={(e)=>{setC3(e.target.value)}}/>
                            </td>
                            <td>
                              <input type="text" className="form-control text-center campcode" maxLength={1} value={c4} onChange={(e)=>{setC4(e.target.value)}}/>
                            </td>
                            <td>
                              <input type="text" className="form-control text-center campcode" maxLength={1} value={c5} onChange={(e)=>{setC5(e.target.value)}}/>
                            </td>
                            <td>
                              <input type="text" className="form-control text-center campcode" maxLength={1} value={c6} onChange={(e)=>{setC6(e.target.value)}}/>
                            </td>
                          </tr>
                      </table>
                      {campCodeErr}
                  </div>
                  <div className='Submition mb-4'>
                      <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="button" value={"Enter"} onClick={()=>{handleCheckCode()}}/>
                  </div>
                </>
              ):(
                <>
                  <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Change your password</h2>
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
                  <div className='Submition mb-4'>
                      <input className={`${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} type="button" value={"Enter"} onClick={()=>{handleUpdatePassword()}}/>
                  </div>
                </>
              )
            }
        </div>
    </div>
  )
}

export default Recovery;