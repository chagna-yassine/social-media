import React, { useState } from 'react'
import './EditProfil.css';
import { IMG_BASE } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faX } from '@fortawesome/free-solid-svg-icons';
import { updateCover, updatePic, updateUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

const EditProfil = ({userData , display , setDisplay}) => {

  const [ t ] = useTranslation("global");

  const [userNameCookies,setUserNameCookies] = useCookies(['username']);
  
  const [cover,setCover] = useState(null);
  const [pic,setPic] = useState(null);
  const [username,setUsername] = useState(userData.username);
  const [bio,setBio] = useState(userData.bio);

  const [previewCover, setPreviewCover] = useState(IMG_BASE+userData.cover);
  const [previewPic, setPreviewPic] = useState(IMG_BASE+userData.profilePic);

  const handleCoverChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setCover(selectedFile);

      // Read the selected file and create a URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewCover(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePicChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setPic(selectedFile);
      // Read the selected file and create a URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpdateCover = async()=>{
    try {
      //send the new post to the signup api
      const coverData = new FormData();
      coverData.append('user_id', userData._id);
      coverData.append('cover', cover);
      const response = await updateCover(coverData);
      console.log(response); // Handle success or display error message
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdatePic = async()=>{
    try {
      //send the new post to the signup api
      const picData = new FormData();
      picData.append('user_id', userData._id);
      picData.append('profilePic', pic);
      const response = await updatePic(picData);
      console.log(response); // Handle success or display error message
    } catch (error) {
      console.error(error);
    }
  }
  
  const [usernameErr,setUsernameErr] = useState('');
  const [isErr,setIsErr] = useState(true);

  const handeUsernameValidity = ()=>{
    const userPattern = /^[A-Za-z]+([.\-_@# 0-9]?[A-Za-z]+)+$/;
    if(!username){
      setUsernameErr(<p className='alert alert-danger err'>{t('signup.Errs.usernameErr')}</p>);
      setIsErr(true);
    }else if(!userPattern.test(username)){
      setUsernameErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidUsernameErr')}</p>);
      setIsErr(true);
    }else{
      setUsernameErr("");
      return false
    }
    return isErr;
  }

  const handleUpdateUser = async()=>{
    const isNotValid = handeUsernameValidity();
    if(!isNotValid){
      const  updatedUser = {user_id : userData._id , username , bio};
      try {
        //send the new user to the signup api
        const response = await updateUser(updatedUser);
        //Check if there is an err 
        if(response.errName === "usernameErr"){
          setUsernameErr(<p className='alert alert-danger err'>{t('signup.Errs.existedUsernameErr')}</p>);
        }else{// Rederect user to the login if there is no err
            setUserNameCookies('username', username)
        }
        console.log(response); // Handle success or display error message
        setDisplay('none');
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className='EditProfil-container' style={{display}}>
        <FontAwesomeIcon className='close' icon={faX} onClick={()=>{setDisplay('none')}}/>
        <div className="cover-container">
            <img src={previewCover} alt="" className="cover-img" />
            <div className='edit-cover-container'>
              <label className='edit-cover' htmlFor="cover">
                <FontAwesomeIcon icon={faPen}/>
                <p>edit cover pic</p>
              </label>
              <input type="file" id="cover" style={{display:'none'}} onChange={(e)=>{handleCoverChange(e)}}/>
            </div>
        </div>
        <div className="Pic">
          <div className="pic-container">
            <img src={previewPic} alt="" className="pic-img" />
          </div>
          <div className='edit-pic-container'>
              <label className='edit-pic' htmlFor="pic">
                <FontAwesomeIcon icon={faPen}/>
                <p>edit profile pic</p>
              </label>
              <input type="file" id="pic" style={{display:'none'}} onChange={(e)=>{handlePicChange(e)}}/>
            </div>
        </div>
        <div className="input-container">
          <label htmlFor="" className="form-label">username:</label>
          <input type="text" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
          {usernameErr}
        </div>
        <div className="input-container">
          <label htmlFor="" className="form-label">bio:</label>
          <input type="text" className="form-control" value={bio} onChange={(e)=>{setBio(e.target.value)}}/>
        </div>
        <div className="submit-container">
            <button className="btn btn-primary" onClick={()=>{handleUpdateUser();cover && handleUpdateCover(); pic && handleUpdatePic();}}>Edit</button>
        </div>
    </div>
  )
}

export default EditProfil