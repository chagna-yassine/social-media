import React, { useState } from 'react'
import Replies from './Replies'
import { handleRemoveModal } from '../Home/Profile/removeAlert';
import { IMG_BASE } from '../App';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import $ from 'jquery';
import { Comment } from '../API/Comment/comment';
import { removeComment } from '../API/Comment/removeComment';
import { sendReply } from '../API/Comment/sendReply';

const Comments = ({ postId , currentDisplayMode , index , handleGetComment , comments , feed}) => {

    const [comment, setComment] = useState('')
    const navigate = useNavigate();
    const [userIdCookies] = useCookies(['userId']);


    const handleComment = async (user_id, post_id, text , index) => {
        try {  
            const response = await Comment(user_id, post_id, text);
            feed[index].commentCount += 1;
            // hundle the success or err 
            console.log(response)
            setComment('')
            handleGetComment();
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
    
      const handleDeleteComment = async(commentId)=>{
        try{
            await removeComment({commentId})
            handleGetComment();
         }catch(error){
            console.error(error);
         }
      }

  return (
    <div id={`Comment-Modal-${postId}`} className={`CommentModal ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
        <div className="CommentModal-list">
            <div className="CommentModal-items"> 
                <ul className="list-group List">
                    { comments.length > 0 && comments.map(({post_id , _id , user_id , replies , text}, key) => (
                        post_id === postId &&
                        <li key={key} className='list-group-item bg-transparent border-0 p-0'>
                            <div id={`Remove-Modal-${_id}`} className="removeCommentAlert">
                                <p className='Remove-item'>Are u sure?</p>
                                <div className="controle">
                                    <button className='btn btn-secondary' onClick={()=>{handleRemoveModal(_id)}}>Cancel</button>
                                    <button className='btn btn-danger' onClick={()=>{handleDeleteComment(_id)}}>Delete</button>
                                </div>
                            </div>
                            <div className={`card border-0 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                <div className="row g-0">
                                    <div className="Logo-container">
                                        <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                                            <img className='Logo-img' src={IMG_BASE+user_id.profilePic} alt={user_id.username} />
                                        </div>
                                    </div>
                                    <div className="w-50 d-flex align-items-center">
                                        <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'} cursor-pointer`} onClick={()=>{navigate(`/${user_id.username}`)}}>{user_id.username}</h2>
                                    </div>
                                </div>
                            </div>
                            <p className={`List-item m-0 mb-2 ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{text}</p>
                            <div className={`Cmnt-Interactions ${user_id._id === userIdCookies.userId && "delete"}`}>
                                <p onClick={()=>{setReply(`@${user_id.username}`);setReplied_to(user_id._id);setCommentId(_id);setReplied_toName(user_id.username);setPost_id(post_id);handleToggleAnimation(_id)}}>reply</p>
                                <p>{replies.length}</p>
                                {
                                    user_id._id === userIdCookies.userId && (
                                        <p onClick={()=>{handleRemoveModal(_id)}}>delete</p>
                                    )
                                }
                            </div>
                            <div id={`Reply-${_id}`} className={`Reply-modal ${commentId === _id && isExpanded ? "expanded" : "collapsed"}`}>
                                {  replies.map((reply)=>(
                                    <Replies
                                        reply={reply}
                                        cmnt={_id}
                                        currentDisplayMode={currentDisplayMode}
                                        handleGetComment={handleGetComment}
                                    />
                                ))}
                            <p className='text-primary' onClick={()=>{handleToggleAnimation(_id)}}>Hide replies</p>
                            </div>
                        </li>
                    ))
                    }
                </ul>
                {
                    reply.indexOf(`@${replied_toName}`) === -1 ? (
                        <form className='Submition' onSubmit={(e)=>{e.preventDefault();handleGetComment();}}>
                            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                            <button type='button' className='button bg-primary border-0' onClick={()=>{comment && handleComment(userIdCookies.userId, postId, comment , index)}}>send</button>
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
  )
}

export default Comments