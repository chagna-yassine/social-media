import React, { useEffect } from 'react';
import "./Main.css";
import { useCookies } from 'react-cookie';
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import testImg from "../../Images/Light-5.jpeg"
import { useTranslation } from 'react-i18next';
import { handleCommentModal } from './comment';
import { useNavigate } from 'react-router-dom';

const Main = () => {

    const [ t ] = useTranslation("global");

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
        document.title = t("home.main.label");
    },[t])

  return (
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
                    <div id="Comment-Modal-1" className="CommentModal">
                      <div className="CommentModal-list">
                          <div className="CommentModal-items"> 
                            <ul className="list-group List">
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                            </ul>
                          </div>
                      </div>
                    </div>
                </div>
                <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <div className="Interactions-item">
                        <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                    </div>
                    <div className="Interactions-item">
                        <FontAwesomeIcon className="Interactions-item-icon" icon={faComment} onClick={()=>{handleCommentModal("1")}}/>
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
                    <div id="Comment-Modal-2" className="CommentModal">
                      <div className="CommentModal-list">
                          <div className="CommentModal-items"> 
                            <ul className="list-group List">
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                            </ul>
                          </div>
                      </div>
                    </div>
                </div>
                <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <div className="Interactions-item">
                        <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                    </div>
                    <div className="Interactions-item">
                        <FontAwesomeIcon className="Interactions-item-icon" icon={faComment} onClick={()=>{handleCommentModal("2")}}/>
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
                    <div id="Comment-Modal-3" className="CommentModal">
                      <div className="CommentModal-list">
                          <div className="CommentModal-items"> 
                            <ul className="list-group List">
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>random comment for this post</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>somthing about the post wich user like or not</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>nice ppicture</li>
                              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>just passing by</li>
                            </ul>
                          </div>
                      </div>
                    </div>
                </div>
                <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <div className="Interactions-item">
                        <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                    </div>
                    <div className="Interactions-item">
                        <FontAwesomeIcon className="Interactions-item-icon" icon={faComment} onClick={()=>{handleCommentModal("3")}}/>
                    </div>
                    <div className="Interactions-item">
                        <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                    </div>
                </div>
            </div>
        </li>
    </ul>
  )
}
export default Main;