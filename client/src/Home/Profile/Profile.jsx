import React, {  useEffect, useState } from 'react';
import "./Profile.css";
import { useCookies } from 'react-cookie';
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPost, getComment, Like, Comment, checkLike, unLike, countLike, countComment, getUser, checkExistence, deletePost, sendReply } from '../../api';
import { handleCommentModal } from '../Main/comment';
import { IMG_BASE, VID_BASE } from '../../App';
import EditProfil from './EditProfil';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { handleRemoveModal } from './removeAlert';
import $ from 'jquery'

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
  const [isLoadedPost,setIsLoadedPost] = useState(false);
  const [userDataLoaded,setUserDataLoaded] = useState(false);

  const [user , setUser] = useState([]);
  const [display , setDisplay] = useState('none');

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
    document.title = `${userNameCookies.username} - ${t("home.profile.label")}`;
    const handeUserData = async()=>{
        setUser(await getUser({ username: userNameCookies.username }));
        setUserDataLoaded(true)
    }
    isLoading && handeUserData();
    setIsLoading(false)
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,comments])
  
  // geting all the post for the user 
  const handleGetPost = async () => {
    try {
        const user_id = userIdCookies.userId;
        const response = await getPost(user_id);
        const newPosts =  await Promise.all(
            response.map(async(post)=>{
                const isLiked = await checkLike({
                    user_id, 
                    post_id : post._id
                })
                const likeCount = await countLike({ post_id : post._id});
                const commentCount = await countComment({ post_id : post._id});
                return { ...post , likeStatus : isLiked.message , likeCount , commentCount}
            })
        ) 
        // return the result in the post variable to be used later
        setPosts(newPosts);
        setIsLoadedPost(true)
    } catch (error) {
        console.error(error);
    }
  };

  // geting all the comment for the user 
  const handleGetComment = async () => {
    try {        
        const response = await getComment();

        // return the result in the post variable to be used later
        setComments(response);
        handleGetPost();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    handleGetPost(); 
  }, []);

  // add like   
  const handleLike = async (user_id, post_id) => {
    try {  
        const response = await Like(user_id, post_id);
        handleGetPost();
        // hundle the success or err 
        console.log(response)
    } catch (error) {
        console.error(error);
    }
  };
  const handleUnLike = async (user_id, post_id) => {
    try {  
        const response = await unLike({user_id, post_id});
        handleGetPost();
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
        setComment('')
    } catch (error) {
        console.error(error);
    }
  };

  const handleDeletePost = async(id)=>{
     try{
        await deletePost({id})
        window.location.reload();
     }catch(error){
        console.error(error);
     }
  }
  const [commentId,setCommentId] = useState('');
  const [reply,setReply] = useState('');
  const [replied_to,setReplied_to] = useState('');
  const [replied_toName,setReplied_toName] = useState('');
  const [post_id,setPost_id]= useState('')
  const [isExpanded,setIsExpanded] = useState(false)

  
  const handleSendReply = async()=>{
    try{
        await sendReply({commentId,
                         user_id: userIdCookies.userId ,
                         post_id,
                        replied_to ,
                        content: reply
                    })
        handleGetComment();
     }catch(error){
        console.error(error);
     }
  }
  
  const handleToggleAnimation = (id) => {
    $(`#Reply-${id}`).slideToggle(300);
    setIsExpanded(!isExpanded)
  };

  return (
     !isLoading && (
        <div className='Profile-container'>
            {
                userDataLoaded && (<EditProfil userData={user} display={display} setDisplay={setDisplay}/>)
            }
        <div className="Profile">
            <div className="Profile-cover">
                <img src={userDataLoaded ? IMG_BASE+user.cover : undefined} alt={userDataLoaded && user.username} />
            </div>
            <div className={`Profile-pic ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
                <img src={userDataLoaded ? IMG_BASE+user.profilePic : undefined} alt={userDataLoaded && user.username} />
            </div>
            <div className={`Profile-info ${i18n.language === "ar" ? "ar" : null}`}>
            <h3 className={`Profile-name ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{userDataLoaded && user.username}</h3>
            <p className={`Profile-bio ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{userDataLoaded && user.bio}</p>
            </div>
            <div className={`Profile-actions ${i18n.language === "ar" ? "ar" : i18n.language === "fr" ? "fr" : null}`}>
            <button className={`Add-post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}><Link to="/addPost" className='text-decoration-none'>{t("home.profile.add")}</Link></button>
            <button className={`Edit-Profile ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={()=>{display === 'none' ? setDisplay('block') : setDisplay('none')}}>{t("home.profile.edit")}</button>
            </div>
        </div>
        <h4 className='Post-Label'>{t("home.profile.posts")}</h4>
        <ul className={`list-group Post-List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
        {
            isLoadedPost && posts && posts.map((post,index)=>(
                    <li loading="lazy" key={index} id={post._id} className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                        <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                            <div className="card-body Post-header">
                                <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                    <div className="row g-0">
                                        <div className="Logo-container">
                                            <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                                <img className='Logo-img' src={IMG_BASE+post.user_id.profilePic} alt={post.user_id.username} />
                                            </div>
                                        </div>
                                        <div className="w-50 d-flex align-items-center">
                                            <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{post.user_id.username}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                <FontAwesomeIcon className={`removePost ${post.media.status === 'noMedia' && "text"}`} icon={faX} onClick={()=>{handleRemoveModal(post._id)}}/>
                                <div id={`Remove-Modal-${post._id}`} className="removeAlert">
                                    <h2 className='Remove-item'>Are u sure?</h2>
                                    <div className="controle">
                                        <button className='btn btn-secondary' onClick={()=>{handleRemoveModal(post._id)}}>Cancel</button>
                                        <button className='btn btn-danger' onClick={()=>{handleDeletePost(post._id)}}>Delete</button>
                                    </div>
                                </div>
                                {
                                    post.media.status === 'noMedia' ? (
                                        <p className="card-img-top Post-content-text bg-dark text-white d-flex justify-content-center align-items-center">{post.text}</p>
                                    ): post.media.status === 'image' ?(
                                        <>
                                            <p className='m-0 text-white ms-4 fw-bold fs-5 text-small-caps'>{post.text}</p>
                                            <img src={IMG_BASE+post.media.url} className="card-img-top Post-content-img" alt={post.media.name}/>
                                        </>
                                    ):(
                                        <>
                                            <p className='m-0 text-white ms-4 fw-bold fs-5 text-small-caps'>{post.text}</p>
                                            <video className="card-img-top Post-content-video" src={VID_BASE+post.media.url} title={post.media.name} controls loop preload='none' muted poster={IMG_BASE+post.media.poster_url}></video>
                                        </>
                                    )
                                }
                                <div id={`Comment-Modal-${post._id}`} className="CommentModal">
                                    <div className="CommentModal-list">
                                        <div className="CommentModal-items"> 
                                            <ul className="list-group List">
                                                { comments && comments.map((cmnt, key) => (
                                                    cmnt.post_id === post._id &&
                                                    <li key={key} className='list-group-item bg-transparent border-0 p-0'>
                                                        <div className={`card border-0 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                                            <div className="row g-0">
                                                                <div className="Logo-container">
                                                                    <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                                                        <img className='Logo-img' src={IMG_BASE+cmnt.user_id.profilePic} alt={cmnt.user_id.username} />
                                                                    </div>
                                                                </div>
                                                                <div className="w-50 d-flex align-items-center">
                                                                    <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'} cursor-pointer`} onClick={()=>{navigate(`/${cmnt.user_id.username}`)}}>{cmnt.user_id.username}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className={`List-item m-0 mb-2 ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{ cmnt.text}</p>
                                                        <div className={`Cmnt-Interactions ${cmnt.user_id._id === userIdCookies.userId && "delete"}`}>
                                                            <p onClick={()=>{setReply(`@${cmnt.user_id.username}`);setReplied_to(cmnt.user_id._id);setCommentId(cmnt._id);setReplied_toName(cmnt.user_id.username);setPost_id(cmnt.post_id);handleToggleAnimation(cmnt._id)}}>reply</p>
                                                            <p>{cmnt.replies.length}</p>
                                                            {
                                                                cmnt.user_id._id === userIdCookies.userId && (
                                                                    <p>delete</p>
                                                                )
                                                            }
                                                        </div>
                                                        <div id={`Reply-${cmnt._id}`} className='Reply-modal'>
                                                            {  cmnt.replies.map((reply)=>(
                                                            <>
                                                                <li key={reply._id} className='list-group-item bg-transparent border-0 p-0 Reply'>
                                                                    <div className={`card border-0 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                                                        <div className="row g-0">
                                                                            <div className="Logo-container">
                                                                                <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                                                                    <img className='Logo-img' src={IMG_BASE+reply.user_id.profilePic} alt={reply.user_id.username} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-50 d-flex align-items-center">
                                                                                <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'} cursor-pointer`} onClick={()=>{navigate(`/${reply.user_id.username}`)}}>{reply.user_id.username}</h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <p className={`List-item m-0 mb-2 ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{ reply.text}</p>
                                                                    <div className="Cmnt-Interactions">
                                                                    {
                                                                        reply.user_id._id === userIdCookies.userId && (
                                                                            <p>delete</p>
                                                                        )
                                                                    }
                                                                    </div>
                                                                </li>
                                                            </>
                                                        ))}
                                                        <p className='text-primary' onClick={()=>{handleToggleAnimation(cmnt._id)}}>Hide replies</p>
                                                        </div>
                                                    </li>
                                                    ))
                                                }
                                            </ul>
                                            {
                                                reply.indexOf(`@${replied_toName}`) === -1 ? (
                                                    <form className='Submition' onSubmit={(e)=>{e.preventDefault();handleGetComment();}}>
                                                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                                                        <button type='button' className='button bg-primary border-0' onClick={()=>{handleComment(userIdCookies.userId, post._id, comment , index);handleGetComment();}}>send</button>
                                                    </form>
                                                ):(
                                                    <form className='Submition replySubmition' onSubmit={(e)=>{e.preventDefault();handleGetComment();}}>
                                                        <input type="text" value={reply} onChange={(e) => setReply(e.target.value)}/>
                                                        <button type='button' className='button bg-primary border-0' onClick={()=>{handleSendReply();}}>send</button>
                                                    </form>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                <div className="Interactions-item">
                                    {
                                        post.likeStatus === 'notLiked' ? (
                                            <FontAwesomeIcon className="Interactions-item-icon " icon={faHeart} onClick={()=>{handleLike(userIdCookies.userId, post._id , index)}}/>
                                        ) : (
                                            <FontAwesomeIcon className="Interactions-item-icon text-danger" icon={faHeart} onClick={()=>{handleUnLike(userIdCookies.userId, post._id , index)}}/>
                                        )
                                    }
                                </div>
                                <p className="LikeCount m-0 text-white">{post.likeCount}</p>
                                <div className="Interactions-item">
                                    <FontAwesomeIcon className="Interactions-item-icon" icon={faComment} onClick={()=>{handleCommentModal(post._id);handleGetComment();}}/>
                                </div>
                                <p className="CommentCount m-0 text-white">{post.commentCount}</p>
                                <div className="Interactions-item">
                                    <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                                </div>
                                <p className="ShaireCount m-0 text-white">0</p>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
        </div>
        )
    )
}

export default Profile