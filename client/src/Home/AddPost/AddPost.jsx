import React, { useEffect, useState } from 'react'
import "./AddPost.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhotoVideo, faUserTag } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { checkExistence, uploadImgPost, uploadVideoPost } from '../../api'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AddPost = () => {

  const [ t , i18n ] = useTranslation("global");

  //post stat
  const [caption, setCaption] = useState('');
  const [text, setText] = useState('');

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  const navigate = useNavigate();

  const [media,setMedia] = useState(null);

  const showSuccessAlert = () => {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  };

  const showErrAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  };

  useEffect(()=>{
    //Check if the user not loged in and rederect him to the login
    const checkUserInfo = async()=>{
      if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
        navigate("/login");
      }else{
          const response = await checkExistence({userId: userIdCookies.userId , username : userNameCookies.username})
          console.log(response);
        if(!response.isExist){
          navigate("/login");
        }
      }
    }
  checkUserInfo();
    document.title = t("home.addPost.label");
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,])

  // function that handle adding a post (only text post for now)
  const handleAddPost = async () => {
    // add a value to the caption just for test
    setCaption('default caption');
    try {
      //send the new post to the signup api
      const postData = new FormData();
      postData.append('user_id', userIdCookies.userId);
      postData.append('caption', caption);
      postData.append('text', text);
      let response;
      if(media.type === 'video/mp4'){
        postData.append('video', media);
        response = await uploadVideoPost(postData);
      }else{
        postData.append('image', media);
        response = await uploadImgPost(postData);
      }
      navigate('/')

      // show success alert
      showSuccessAlert();
      
      console.log(response); // Handle success or display error message
    } catch (error) {
      // show success alert
      showErrAlert();
      console.error(error);
    }
  };

  return (
    <div className='AddPost'>
        <div className={`AddPost-header ${i18n.language === "ar" ? "ar" : null}`}>
          <h4 className={`AddPost-header-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.addPost.create")}</h4>
          <button className={`AddPost-header-send ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={handleAddPost}>{t("home.addPost.post")}</button>
        </div>
        <div className="Post-data">
            <div className={`Post-data-text ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <textarea placeholder={t("home.addPost.postText")} value={text} onChange={(e)=>{setText(e.target.value)}}></textarea>
            </div>
            <div className={`Post-data-features ${i18n.language === "ar" ? "ar" : null}`}>
                <div className={`feature ${i18n.language === "ar" ? "ar" : null}`}>
                  <div className="feature-icon-container">
                      <label className='cursor-pointer' htmlFor="Upload"><FontAwesomeIcon className='feature-icon media' icon={faPhotoVideo}/></label>
                      <input type="file" accept='.jpeg , .png , .jpg , .mp4' className='file-input' id='Upload' onChange={(e)=>{setMedia(e.target.files[0])}}/>
                  </div>
                  <label className='cursor-pointer' htmlFor="Upload"><p className={`feature-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.addPost.media")}</p></label>
                </div>
                <div className={`feature ${i18n.language === "ar" ? "ar" : null}`}>
                  <div className="feature-icon-container">
                      <FontAwesomeIcon className='feature-icon tag' icon={faUserTag}/>
                  </div>
                  <p className={`feature-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.addPost.tag")}</p>
                </div>
                <div className={`feature ${i18n.language === "ar" ? "ar" : null}`}>
                  <div className="feature-icon-container">
                      <FontAwesomeIcon className='feature-icon location' icon={faLocationDot}/>
                  </div>
                  <p className={`feature-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.addPost.location")}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddPost;