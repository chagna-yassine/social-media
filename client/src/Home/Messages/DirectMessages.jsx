import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { getMessages , sendMessage } from '../../api';

const DirectMessages = () => {

    const {username} = useParams();

    const [ t , i18n ] = useTranslation("global");

    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';
  
    const messagesEndRef = useRef(null);
  
    //Declare user cookies
    const [userCookies] = useCookies(['token']);
    const [userIdCookies] = useCookies(['userId']);
    const [userNameCookies] = useCookies(['username']);
  
    const navigate = useNavigate();
    const [messages,setMessages] = useState([])

    const [isLoading,setIsLoading] = useState(true);

    const handleMessages = useCallback(async()=>{
        setMessages(await getMessages({senderId : userIdCookies.userId}));
        setIsLoading(false);
    },[setMessages,userIdCookies.userId,setIsLoading])

    const [content,setContent] = useState('');

    const handleSendMessages = async (e)=>{
        if (e.key === 'Enter') {
            content && sendMessage({senderId : userIdCookies.userId , content});
            handleMessages();
            setContent('');
        }
    }

    useEffect(() => {
      //Check if the user not loged in and rederect him to the login
      if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
        navigate("/login");
      }
      document.title = username;
      handleMessages();
    }, [t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,username,handleMessages,isLoading]);

    useEffect(()=>{
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    },[messages])

  return (
    <div className="Messages-box">
            <div className={`Messages-box-header ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Messages-box-header-info">
                <div className="Logo"></div>
                <p className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{username}</p>
              </div>
              <FontAwesomeIcon className={`Info-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faInfoCircle}/>
            </div>
            <div id='Conversation' className="Conversation">
              {
                !isLoading && messages.messages.map(({sender ,content},index)=>(
                  sender === userIdCookies.userId ? (
                    <div key={index} className={`Sent-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <p className="Message">{content}</p>
                    </div>
                  ):(
                    <div key={index} className={`Incoming-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="Logo"></div>
                      <p className="Message">{content}</p>
                    </div>
                  )
                ))
              }
              <div ref={messagesEndRef}/>
            </div>
            <div className="Messages-form">
              <div className={`Input-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
                <input type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} onKeyPress={(e)=>{handleSendMessages(e)}}/>
                <FontAwesomeIcon className={`Img-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faImage}/>
              </div>
            </div>
          </div>
  )
}

export default DirectMessages;