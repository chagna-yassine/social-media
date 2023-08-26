import React, { useCallback, useEffect, useState } from 'react';
import testImg from "../../Images/Light-5.jpeg"
import testImg_2 from "../../Images/Light-6.jpeg"
import testImg_3 from "../../Images/Dark-6.jpeg"
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { getUser } from '../../api';

const SearchedProfile = () => {
    //get the username from the ur param
    const {username} = useParams();
    const [user , setUser] = useState([]);

    const [ t , i18n ] = useTranslation("global");

    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';
  
    //Declare user cookies
    const [userCookies] = useCookies(['token']);
    const navigate = useNavigate();
  
    // function that send the username to the api and get his data
    //Use a callback hook to prevend multiple rerender in the useEffect hook
    const handeUserData = useCallback(async()=>{
        setUser(await getUser({username}));
    },[username,setUser])

    //a useEffect hook that handle the document title and the existens of the userCookies 
    useEffect(()=>{
      //Check if the user not loged in and rederect him to the login
      if(!userCookies.token){
          navigate("/login");
        }
      //set the document title to the username
      document.title = username;
      //call the function handeUserData when the component render and fetch the data
      handeUserData();
    },[t,navigate,userCookies.token,username,handeUserData])
  
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
            <h3 className={`Profile-name ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{user.username}</h3>
            <p className={`Profile-bio ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>This is my bio</p>
          </div>
          <div className={`Profile-actions ${i18n.language === "ar" ? "ar" : i18n.language === "fr" ? "fr" : null}`}>
             <button className={`Add-post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Follow</button>
             <button className={`Edit-Profile ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Message</button>
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

export default SearchedProfile;