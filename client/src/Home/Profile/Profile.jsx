import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { useCookies } from 'react-cookie';
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import testImg_2 from "../../Images/Light-6.jpeg"
import testImg_3 from "../../Images/Dark-6.jpeg"
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPost, getComment, Like, Comment } from '../../api';
import { handleCommentModal } from '../Main/comment';

const Profile = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  //Declare user post   
  const [posts, setPosts] = useState([{}]);
  //Declare user comments
  const [comments, setComments] = useState([{}]);

  //comment variable
  const [comment, setComment] = useState('')
  
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    //Check if the user not loged in and rederect him to the login
    if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
        navigate("/login");
    }
    document.title = `${userNameCookies.username} - ${t("home.profile.label")}`;
    setIsLoading(false)
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username])
  
  // geting all the post for the user 
  const handleGetPost = async () => {
    try {
        const user_id = userIdCookies.userId;
        
        const response = await getPost(user_id);

        // return the result in the post variable to be used later
        setPosts(response.reverse());
    } catch (error) {
        console.error(error);
    }
  };

  // geting all the comment for the user 
  const handleGetComment = async () => {
    try {        
        const response = await getComment();

        // return the result in the post variable to be used later
        setComments(response.reverse());
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    handleGetPost(); 
    handleGetComment();
  }, []);

  // add like   
  const handleLike = async (user_id, post_id) => {
    try {  
        const response = await Like(user_id, post_id);

        // hundle the success or err 
        console.log(response)
    } catch (error) {
        console.error(error);
    }
  };

  // add Comment   
  const handleComment = async (user_id, post_id, text) => {
    try {  
        const response = await Comment(user_id, post_id, text);

        // hundle the success or err 
        console.log(response)
    } catch (error) {
        console.error(error);
    }
  };

  return (
     !isLoading && (
        <div className='Profile-container'>
      <div className="Profile">
        <div className="Profile-cover">
            <img src={testImg_2} alt="" />
        </div>
        <div className={`Profile-pic ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
          <img src={testImg_3} alt="" />
        </div>
        <div className={`Profile-info ${i18n.language === "ar" ? "ar" : null}`}>
          <h3 className={`Profile-name ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{userNameCookies.username}</h3>
          <p className={`Profile-bio ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>This is my bio</p>
        </div>
        <div className={`Profile-actions ${i18n.language === "ar" ? "ar" : i18n.language === "fr" ? "fr" : null}`}>
           <button className={`Add-post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}><Link to="/addPost" className='text-decoration-none'>{t("home.profile.add")}</Link></button>
           <button className={`Edit-Profile ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.profile.edit")}</button>
        </div>
      </div>
      <h4 className='Post-Label'>{t("home.profile.posts")}</h4>
      <ul className={`list-group Post-List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
      {
        posts.map((dictionary, index) => (

            <li key={index} id={dictionary._id} className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
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
                   
                    <div className={`style card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                        <p>{dictionary.text}</p>
                    </div>

                    <div id={`Comment-Modal-${dictionary._id}`} className="CommentModal">
                      <div className="CommentModal-list">
                          <div className="CommentModal-items"> 
                            <ul className="list-group List">
                            {comments.map((cmnt, key) => (
                                // cmnt.post_id == dictionary.post_id ? console.log("commnt"): null
                                <li key={key} className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{cmnt.text}</li>
                                ))
                            }
                            </ul>
                            <form >
                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                                <button onClick={()=>{handleComment(dictionary.user_id, dictionary._id, comment)}}>send</button>
                            </form>
                          </div>
                      </div>
                    </div>
                   
                    <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                        <div className="Interactions-item">
                            <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart} onClick={()=>{handleLike(dictionary.user_id, dictionary._id)}}/>
                        </div>
                        <div className="Interactions-item">
                            <FontAwesomeIcon className="Interactions-item-icon" icon={faComment} onClick={()=>{handleCommentModal(dictionary._id)}}/>
                        </div>
                        <div className="Interactions-item">
                            <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                        </div>
                    </div>
                </div>
            </li>
            ))
        }
            {/* <li className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
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
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, commodi voluptates. Est saepe mollitia aut omnis vero quae labore quasi modi veritatis consequuntur maxime iste tempore aspernatur voluptas, eaque voluptate?</p>
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
          </li> */}
          {/* <li className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
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
          </li> */}
      </ul>
    </div>
     )
  )
}

export default Profile