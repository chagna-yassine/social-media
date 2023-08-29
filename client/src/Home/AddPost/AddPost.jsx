import React, { useEffect, useState } from 'react'
import "./AddPost.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhotoVideo, faUserTag } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { uploadPost } from '../../api'

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

  useEffect(()=>{
    //Check if the user not loged in and rederect him to the login
    if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
      navigate("/login");
    }
    document.title = t("home.addPost.label");
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,])

  // function that handle adding a post (only text post for now)
  const handleAddPost = async () => {
    // add a value to the caption just for test
    setCaption('default caption');
    
    const newPost = {user_id: userIdCookies.userId, caption, text};
    console.log("newPost :", newPost);
    try {
      //send the new post to the signup api
      const response = await uploadPost({user_id: userIdCookies.userId, caption, text});
      console.log(response); // Handle success or display error message
    } catch (error) {
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
                      <FontAwesomeIcon className='feature-icon media' icon={faPhotoVideo}/>
                  </div>
                  <p className={`feature-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.addPost.media")}</p>
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