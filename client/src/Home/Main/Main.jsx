import React, { useEffect, useState } from 'react';
import "./Main.css";
import { useCookies } from 'react-cookie';
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { handleCommentModal } from './comment';
import { useNavigate } from 'react-router-dom';
import { Comment, Like, getComment, getFeed, unLike } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../../DataStore/Likes/actions'
import { IMG_BASE, VID_BASE } from '../../App';


const Main = () => {

    const [ t ] = useTranslation("global");

    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';

    //Declare user cookies
    const [userCookies] = useCookies(['token']);
    const [userIdCookies] = useCookies(['userId']);
    const [userNameCookies] = useCookies(['username']);

    const navigate = useNavigate();

    //Handle loading state
    const [isLoading,setIsLoading] = useState(true);

    const [feed,setFeed] = useState([])
    const [feedCache,setFeedCache] = useState([])

    const likes = useSelector((state)=> state.likes);
    const dispatch = useDispatch();

    useEffect(()=>{
        //Check if the user not loged in and rederect him to the login
        if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
            navigate("/login");
          }
        document.title = t("home.main.label");
        //Set the loading state to false when the component load
        setIsLoading(false)
    },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,likes])

  const [comments, setComments] = useState([{}]);
  //comment variable
  const [comment, setComment] = useState('')

    const handleFeedCache = async()=>{
        const user_id = userIdCookies.userId;
        const response = await getFeed(user_id);
        setFeedCache(response)
    }

    const handleFeed = ()=>{
        setFeed(feedCache)
    }

    const handleGetComment = async () => {
        try {        
            const response = await getComment();
    
            // return the result in the post variable to be used later
            setComments(response);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
      };

      useEffect(() => {
        isLoading && handleFeedCache();
        !isLoading && feedCache.length > 0 && handleFeed();
      }, [likes,isLoading,feedCache]);

    // add like

  const handleLike = async (user_id, post_id , index) => {
    try {  
        const response = await Like(user_id, post_id);
        feed[index].likeStatus = 'liked';
        feed[index].likeCount += 1;
        dispatch(addLike({
            from: user_id,
            post : post_id
        }))
        // hundle the success or err 
        console.log(response)
    } catch (error) {
        console.error(error);
    }
  };
  const handleUnLike = async (user_id, post_id , index) => {
    try {  
        const response = await unLike({user_id, post_id});
        feed[index].likeStatus = 'notLiked';
        feed[index].likeCount -= 1;
        dispatch(removeLike({
            from: user_id,
            post : post_id
        }))
        // hundle the success or err 
        console.log(response)
    } catch (error) {
        console.error(error);
    }
  };

  // add Comment   
  const handleComment = async (user_id, post_id, text , index) => {
    try {  
        const response = await Comment(user_id, post_id, text);
        feed[index].commentCount += 1;
        // hundle the success or err 
        console.log(response)
        setComment('')
    } catch (error) {
        console.error(error);
    }
  };

  return (
    //Handle if the component is Fully loading
    !isLoading &&(
        <ul className={`list-group Post-List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            {
             feed.map((post,index)=>(
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
                                            <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'} cursor-pointer`} onClick={()=>{navigate(`/${post.user_id.username}`)}}>{post.user_id.username}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
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
                                                        <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
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
                                                    </li>
                                                    ))
                                                }
                                            </ul>
                                            <form onSubmit={(e)=>{e.preventDefault();handleGetComment();}}>
                                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                                                <button onClick={()=>{handleComment(userIdCookies.userId, post._id, comment , index);handleGetComment();}}>send</button>
                                            </form>
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
    )
  )
}
export default Main;