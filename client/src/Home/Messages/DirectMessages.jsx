import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faImage, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { getMessages , sendMessage } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { sendMsg } from './MessageStore/actions';

const DirectMessages = () => {

  //get the userName and the conversation id from the url param
    const {username} = useParams();
    const {id} = useParams();

  //handle the translation
    const [ t , i18n ] = useTranslation("global");

  //handle display cookies
    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';
  
  //create a refrence for the last message in the conversation
    const messagesEndRef = useRef(null);
  
    //Declare user cookies
    const [userCookies] = useCookies(['token']);
    const [userIdCookies] = useCookies(['userId']);
    const [userNameCookies] = useCookies(['username']);

  //handle the navigation
    const navigate = useNavigate();

  //Messages arr state
    const [messages,setMessages] = useState([])

  //Handle loading state
    const [isLoading,setIsLoading] = useState(true);

  //get msg from store
  const msg = useSelector((state)=> state.data);
  const dispatch = useDispatch();

  // function that get the conversation messages and Set the loading state to false when the messages loaded
  //Use a callback hook to prevend multiple rerender in the useEffect hook
    const handleMessages = useCallback(async()=>{
        setMessages(await getMessages({ conversationId: id , senderId : userIdCookies.userId}));
        setIsLoading(false);
    },[setMessages,userIdCookies.userId,setIsLoading,id])
  //The sent message content
    const [content,setContent] = useState('');

  // function that send the msg when the user click the enter btn and call the handleMessages to re-render the msg data
    const handleSendMessages = async (e)=>{
        if (e.key === 'Enter') {
            content && sendMessage({ conversationId: id , senderId : userIdCookies.userId , content});
            content && dispatch(sendMsg({
              from: userIdCookies.userId,
              to: messages.otherParticipant,
              msg: content
            }))
            setContent('');
        }
    }

  
    useEffect(() => {
      //Check if the user not loged in and rederect him to the login
      if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
        navigate("/login");
      }

      document.title = `${username} - DM`;
      //call the handleMessages when the component load to fetch msg data
      handleMessages();
    }, [t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,username,handleMessages,isLoading,msg]);

  //Scroll to the last msg when the component load
    useEffect(()=>{
        !isLoading && messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    },[messages,isLoading])

  return (
    //Handle if the component is Fully loading
      !isLoading && (
        <div className="Messages-box">
            <div className={`Messages-box-header ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Messages-box-header-info">
                <FontAwesomeIcon className={`Back-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faArrowLeftLong} onClick={()=>{navigate('/messages')}}/>
                <div className="Logo"></div>
                <p className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{username}</p>
              </div>
              <FontAwesomeIcon className={`Info-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faInfoCircle}/>
            </div>
            <div id='Conversation' className="Conversation">
              {/* Fetch the msg if the msg sender is the connect user the msg gonna be a Sent-message
                  else the msg gonna be a Incoming-message
              */}
              {
                messages.messages.map(({sender ,content},index)=>(
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
                {/* set the msg content on the change of the input value */}
                <input type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} onKeyPress={(e)=>{handleSendMessages(e)}}/>
                <FontAwesomeIcon className={`Img-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faImage}/>
              </div>
            </div>
          </div>
      )
  )
}

export default DirectMessages;