import React, { useEffect } from 'react';
import "./Profile.css";
import { useCookies } from 'react-cookie';
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import testImg from "../../Images/Light-5.jpeg"
import testImg_2 from "../../Images/Light-6.jpeg"
import testImg_3 from "../../Images/Dark-6.jpeg"
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profile = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(()=>{
    //Check if the user not loged in and rederect him to the login
    if(!userCookies.token){
        navigate("/login");
      }
    document.title = t("home.profile.label");
  },[t])

  return (
    <div className='Profile-container'>
      <div className="Profile">
        <div className="Profile-cover">
            <img src={testImg_2} alt="" />
        </div>
        <div className={`Profile-pic ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
          <img src={testImg_3} alt="" />
        </div>
        <div className={`Profile-info ${i18n.language === "ar" ? "ar" : null}`}>
          <h3 className={`Profile-name ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>UserName</h3>
          <p className={`Profile-bio ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>This is my bio</p>
        </div>
        <div className={`Profile-actions ${i18n.language === "ar" ? "ar" : i18n.language === "fr" ? "fr" : null}`}>
           <button className={`Add-post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}><Link to="/addPost" className='text-decoration-none'>{t("home.profile.add")}</Link></button>
           <button className={`Edit-Profile ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.profile.edit")}</button>
        </div>
      </div>
      <h4 className='Post-Label'>{t("home.profile.posts")}</h4>
      <ul className={`list-group Post-List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
          <li className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body Post-header">
                      <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                          <div className="row g-0">
                              <div className="Logo-container">
                                  <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                              </div>
                              <div className="w-50 d-flex align-items-center">
                                  <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <img src={testImg} className="card-img-top Post-content-media" alt="Post" />
                  </div>
                  <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                      </div>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faComment}/>
                      </div>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                      </div>
                  </div>
              </div>
          </li>
          <li className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body Post-header">
                      <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                          <div className="row g-0">
                              <div className="Logo-container">
                                  <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                              </div>
                              <div className="w-50 d-flex align-items-center">
                                  <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <img src={testImg} className="card-img-top Post-content-media" alt="Post" />
                  </div>
                  <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                      </div>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faComment}/>
                      </div>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                      </div>
                  </div>
              </div>
          </li>
          <li className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body Post-header">
                      <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                          <div className="row g-0">
                              <div className="Logo-container">
                                  <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                              </div>
                              <div className="w-50 d-flex align-items-center">
                                  <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <img src={testImg} className="card-img-top Post-content-media" alt="Post" />
                  </div>
                  <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                      </div>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faComment}/>
                      </div>
                      <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                      </div>
                  </div>
              </div>
          </li>
      </ul>
    </div>
  )
}

export default Profile