import React, { useEffect, useState, useCallback, useRef } from 'react';
import "./Main.css";
import { useCookies } from 'react-cookie';
import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { handleCommentModal } from './comment';
import { useNavigate } from 'react-router-dom';
import { Comment, Like, checkExistence, getComment, getFeed, removeComment, removeReply, sendReply, unLike, getUserId, event, getEvent } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../../DataStore/Likes/actions'
import { newLike, newComment, newFollow, newMessage, newPost } from '../../DataStore/Event/action';
import { IMG_BASE, VID_BASE } from '../../App';
import $ from 'jquery'
import { handleRemoveModal } from '../Profile/removeAlert';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config';


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

    const [feed,setFeed] = useState([]);
    const [feedCache,setFeedCache] = useState([]);

    // Event data
    const [events ,setEvent] = useState([]);

    const handleEvent = useCallback(async()=>{
        setEvent(await getEvent());
    },[setEvent])

    const likes = useSelector((state)=> state.likes);
    const dispatch = useDispatch();

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
        handleEvent();
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

    //Ref to the collection in firestore
    const eventref = collection(db,'event');  

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

            const _id = await getUserId({post_id});

            // add data to event collection in db
            try {
                const res = await event({from : user_id,to: _id, type :"like"});
                
                // hundle the success or err 
                console.log(res)
            } catch (error) {
                console.error(error);
            }

            //Send msg to fireStore 
            await addDoc(eventref,{
                from: user_id,
                to: _id,
                type: "like"
            });

            // hundle the success or err 
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    console.log(feed);

    //if a new like is added
    useEffect(()=>{
        if(events){
          //create the query to listen to
          const queryEvent = query(eventref,where("to","==", userIdCookies.userId ),where('from',"!=",userIdCookies.userId));
          //if there is any change on the query grap the data frm the doc and send it to stor as a receiveMsg action
          onSnapshot(queryEvent,(data)=>{
             data.forEach((doc)=>{
                dispatch(newLike({
                    from: userIdCookies.userId,
                    to : "post_id"
                }))
             })
          })
        }
    },[events,likes])

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

  const [commentId,setCommentId] = useState('');
  const [reply,setReply] = useState('');
  const [replied_to,setReplied_to] = useState('');
  const [replied_toName,setReplied_toName] = useState('');
  const [post_id,setPost_id]= useState('')
  const [isExpanded,setIsExpanded] = useState(false)
  const [isFade,setIsFade] = useState(false)

  
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

  const handleDeleteReply = async(commentId , reply_id)=>{
    try{
        await removeReply({commentId , reply_id})
        handleGetComment();
     }catch(error){
        console.error(error);
     }
  }

  const handleDeleteComment = async(commentId)=>{
    try{
        await removeComment({commentId})
        handleGetComment();
     }catch(error){
        console.error(error);
     }
  }

  const imgRef = useRef();
  const [currentPreviewImg,setCurrentPreviewImg] = useState(null)

  const handleImgPreview = (id)=>{
    $(`#img-${id}`).fadeToggle();
    setIsFade(!isFade);
    $('.Feed-container').css('overflow-y', 'hidden');
    imgRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (currentPreviewImg !== null) {
      handleImgPreview(currentPreviewImg);
    }
  }, [currentPreviewImg]);

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
                                        <p className="card-img-top Post-content-text text-white d-flex justify-content-center align-items-center">{post.text}</p>
                                    ): post.media.status === 'image' ?(
                                        <>
                                          <p className='m-0 text-white ms-4 fw-bold fs-5 text-small-caps'>{post.text}</p>
                                          <img src={IMG_BASE+post.media.url} className="card-img-top Post-content-img" ref={currentPreviewImg === post._id ? imgRef : undefined} alt={post.media.name} onClick={()=>{setCurrentPreviewImg(post._id);}}/>
                                          <div id={`img-${post._id}`} className={`img-preview ${currentPreviewImg === post._id && isFade ? "fade-in" : "fade-out"}`}>
                                            <img src={IMG_BASE+post.media.url} className="card-img-top" alt={post.media.name}/>
                                            <div onClick={()=>{$(`#img-${post._id}`).fadeToggle();setIsFade(!isFade);$('.Feed-container').css('overflow-y', 'scroll');setCurrentPreviewImg(null)}}>
                                                <FontAwesomeIcon className='closePreview' icon={faX} />
                                            </div>
                                          </div>
                                        </>
                                    ):(
                                        <>
                                          <p className='m-0 text-white ms-4 fw-bold fs-5 text-small-caps'>{post.text}</p>
                                          <video className="card-img-top Post-content-video" src={VID_BASE+post.media.url} title={post.media.name} controls loop preload='none' muted poster={IMG_BASE+post.media.poster_url}></video>
                                        </>
                                    )
                                }
                            <div id={`Comment-Modal-${post._id}`} className={`CommentModal ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                    <div className="CommentModal-list">
                                        <div className="CommentModal-items"> 
                                        <ul className="list-group List">
                                                { comments && comments.map((cmnt, key) => (
                                                    cmnt.post_id === post._id &&
                                                    <li key={key} className='list-group-item bg-transparent border-0 p-0'>
                                                        <div id={`Remove-Modal-${cmnt._id}`} className="removeCommentAlert">
                                                            <p className='Remove-item'>Are u sure?</p>
                                                            <div className="controle">
                                                                <button className='btn btn-secondary' onClick={()=>{handleRemoveModal(cmnt._id)}}>Cancel</button>
                                                                <button className='btn btn-danger' onClick={()=>{handleDeleteComment(cmnt._id)}}>Delete</button>
                                                            </div>
                                                        </div>
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
                                                                    <p onClick={()=>{handleRemoveModal(cmnt._id)}}>delete</p>
                                                                )
                                                            }
                                                        </div>
                                                        <div id={`Reply-${cmnt._id}`} className={`Reply-modal ${commentId === cmnt._id && isExpanded ? "expanded" : "collapsed"}`}>
                                                            {  cmnt.replies.map((reply)=>(
                                                            <>
                                                                <li key={reply._id} className='list-group-item bg-transparent border-0 p-0 Reply'>
                                                                    <div id={`Remove-Modal-${reply._id}`} className="removeReplyAlert">
                                                                        <p className='Remove-item'>Are u sure?</p>
                                                                        <div className="controle">
                                                                            <button className='btn btn-secondary' onClick={()=>{handleRemoveModal(reply._id)}}>Cancel</button>
                                                                            <button className='btn btn-danger' onClick={()=>{handleDeleteReply(cmnt._id,reply._id)}}>Delete</button>
                                                                        </div>
                                                                    </div>
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
                                                                            <p onClick={()=>{handleRemoveModal(reply._id)}}>delete</p>
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
    )
  )
}
export default Main;