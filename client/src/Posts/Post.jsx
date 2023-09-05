import React, { useEffect, useState } from 'react'
import Content from './Content'
import Header from './Header'
import Interactions from './Interactions'
import { getComment } from '../api'

const Post = ({post , currentDisplayMode , index , feed}) => {
    const { _id , user_id , media , text , likeCount , commentCount , likeStatus } = post;
    const [comments, setComments] = useState([]);

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

    useEffect(()=>{
        handleGetComment();
    },[])

  return (
    <li loading="lazy" key={index} id={_id} className={`list-group-item Post-List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
        <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <Header 
                user_id={user_id} 
                currentDisplayMode={currentDisplayMode}
            />
            <Content
                media={media}
                currentDisplayMode={currentDisplayMode}
                text={text}
                _id={_id}
                index={index}
                handleGetComment={handleGetComment}
                comments={comments}
                feed={feed}
            />
            <Interactions
                currentDisplayMode={currentDisplayMode}
                _id={_id}
                index={index}
                likeCount={likeCount}
                commentCount={commentCount}
                feed={feed}
                handleGetComment={handleGetComment}
                likeStatus={likeStatus}
            />
        </div>
    </li>
  )
}

export default Post;