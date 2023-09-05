import React from 'react'
import Media from './Media'
import Comments from './Comments'

const Content = ({ media , currentDisplayMode , text , _id , index , handleGetComment , comments , feed}) => {
    const {status , url , name , poster_url} = media
    
  return (
    <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
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