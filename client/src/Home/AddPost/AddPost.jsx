import React, { useEffect } from 'react'
import "./AddPost.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhotoVideo, faUserTag } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const AddPost = () => {

  const [ t , i18n ] = useTranslation("global");

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

  return (
    <div className='AddPost'>
        <div className={`AddPost-header ${i18n.language === "ar" ? "ar" : null}`}>
          <h4 className={`AddPost-header-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.addPost.create")}</h4>
          <button className={`AddPost-header-send ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.addPost.post")}</button>
        </div>
        <div className="Post-data">
            <div className={`Post-data-text ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <textarea placeholder={t("home.addPost.postText")}></textarea>
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