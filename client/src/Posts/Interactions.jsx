import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import { handleCommentModal } from '../Home/Main/comment'
import { useDispatch, useSelector } from 'react-redux'
import { Like, event, getEvent, getUserId, unLike } from '../api'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { addLike, removeLike } from '../DataStore/Likes/actions'
import { useCookies } from 'react-cookie'
import { newLike } from '../DataStore/Event/action'

const Interactions = ({ currentDisplayMode , feed , _id , index , likeCount , commentCount , handleGetComment , likeStatus}) => {

    const [userIdCookies] = useCookies(['userId']);

    const eventref = collection(db,'event');  

    const [events ,setEvent] = useState([]);

    const likes = useSelector((state)=> state.likes);
    const dispatch = useDispatch();

    const handleEvent = useCallback(async()=>{
        setEvent(await getEvent());
    },[setEvent])

    useEffect(()=>{
        handleEvent();
    },[likes])

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

    //if a new like is added
    useEffect(()=>{
        if(events){
          //create the query to listen to
          const queryEvent = query(eventref,where("to","==", userIdCookies.userId ),where('from',"!=",userIdCookies.userId));
          //if there is any change on the query grap the data frm the doc and send it to stor as a event action
          onSnapshot(queryEvent,(data)=>{
             data.forEach((doc)=>{
                dispatch(newLike({
                    from: doc.from,
                    to : doc.to
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

  return (
    <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
        <div className="Interactions-item">
            {
                likeStatus === 'notLiked' ? (
                    <FontAwesomeIcon className="Interactions-item-icon " icon={faHeart} onClick={()=>{handleLike(userIdCookies.userId, _id , index)}}/>
                ) : (
                    <FontAwesomeIcon className="Interactions-item-icon text-danger" icon={faHeart} onClick={()=>{handleUnLike(userIdCookies.userId, _id , index)}}/>
                )
            }
        </div>
        <p className="LikeCount m-0 text-white">{likeCount}</p>
        <div className="Interactions-item">
            <FontAwesomeIcon className="Interactions-item-icon" icon={faComment} onClick={()=>{handleCommentModal(_id);handleGetComment();}}/>
        </div>
        <p className="CommentCount m-0 text-white">{commentCount}</p>
        <div className="Interactions-item">
            <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
        </div>
        <p className="ShaireCount m-0 text-white">0</p>
    </div>
  )
}

export default Interactions