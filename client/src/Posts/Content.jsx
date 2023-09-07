import React from 'react'
import Media from './Media'
import Comments from './Comments'
import DeletePost from './DeletePost'
import { useCookies } from 'react-cookie'

const Content = ({ media , currentDisplayMode , text , _id , index , handleGetComment , comments , feed , user_id}) => {
    
  const {status , url , name , poster_url} = media
  const [userIdCookies] = useCookies(['userId']);
    
  return (
    <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
        {
          user_id._id === userIdCookies.userId && (
            <DeletePost 
              _id={_id}
              status={status}
            />
          )
        }
        <Media
            status={status}
            url={url}
            name={name}
            poster_url={poster_url}
            text={text}
            _id={_id}
        />
        {comments !== null &&(<Comments
            postId={_id}
            currentDisplayMode={currentDisplayMode}
            index={index}
            handleGetComment={handleGetComment}
            comments={comments}
            feed={feed}
        />)}
    </div>
  )
}

export default Content