import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { deletePost } from '../API/Post/deletePost'
import { handleRemoveModal } from '../Home/Profile/removeAlert'

const DeletePost = ({_id , status}) => {

    const handleDeletePost = async(id)=>{
        try{
           await deletePost({id})
           window.location.reload();
        }catch(error){
           console.error(error);
        }
     }

  return (
    <>
        <FontAwesomeIcon className={`removePost ${status === 'noMedia' && "text"}`} icon={faX} onClick={()=>{handleRemoveModal(_id)}}/>
        <div id={`Remove-Modal-${_id}`} className="removeAlert">
            <h2 className='Remove-item'>Are u sure?</h2>
            <div className="controle">
                <button className='btn btn-secondary' onClick={()=>{handleRemoveModal(_id)}}>Cancel</button>
                <button className='btn btn-danger' onClick={()=>{handleDeletePost(_id)}}>Delete</button>
            </div>
        </div>
    </>
  )
}

export default DeletePost