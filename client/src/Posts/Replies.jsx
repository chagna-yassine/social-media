import React from 'react'
import { handleRemoveModal } from '../Home/Profile/removeAlert'
import { IMG_BASE } from '../App'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { removeReply } from '../API/Comment/removeReply';

const Replies = ({reply , cmnt , currentDisplayMode , handleGetComment}) => {

    const { _id , user_id , text } = reply
    const { profilePic , username } = user_id
    const navigate = useNavigate();
    const [userIdCookies] = useCookies(['userId']);

    const handleDeleteReply = async(commentId , reply_id)=>{
        try{
            await removeReply({commentId , reply_id})
            handleGetComment();
         }catch(error){
            console.error(error);
         }
      }


  return (
    <li key={_id} className='list-group-item bg-transparent border-0 p-0 Reply'>
        <div id={`Remove-Modal-${_id}`} className="removeReplyAlert">
            <p className='Remove-item'>Are u sure?</p>
            <div className="controle">
                <button className='btn btn-secondary' onClick={()=>{handleRemoveModal(_id)}}>Cancel</button>
                <button className='btn btn-danger' onClick={()=>{handleDeleteReply(cmnt,_id)}}>Delete</button>
            </div>
        </div>
        <div className={`card border-0 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <div className="row g-0">
                <div className="Logo-container">
                    <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                        <img className='Logo-img' src={IMG_BASE+profilePic} alt={username} />
                    </div>
                </div>
                <div className="w-50 d-flex align-items-center">
                    <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'} cursor-pointer`} onClick={()=>{navigate(`/${username}`)}}>{username}</h2>
                </div>
            </div>
        </div>
        <p className={`List-item m-0 mb-2 ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{text}</p>
        <div className="Cmnt-Interactions">
        {
            user_id._id === userIdCookies.userId && (
                <p onClick={()=>{handleRemoveModal(_id)}}>delete</p>
            )
        }
        </div>
    </li>
  )
}

export default Replies