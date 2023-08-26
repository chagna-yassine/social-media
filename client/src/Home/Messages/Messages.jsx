import React, { useEffect, useRef } from 'react'
import "./Messages.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Messages = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  const messagesRef = useRef(null);

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  const navigate = useNavigate();

  useEffect(() => {
    //Check if the user not loged in and rederect him to the login
    if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
      navigate("/login");
    }
    document.title = t("home.msgs");
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,]);
  return (
    <div className='Messages'>
        <div className={`Messages-header ${i18n.language === "ar" ? "ar" : null}`}>
          <h4 className={`Messages-header-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.msgs")}</h4>
        </div>
        <div className={`Messages-container ${i18n.language === "ar" ? "ar" : null}`}>
          <div className={`Friends ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User1</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User2</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User3</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User4</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User5</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User6</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User7</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User8</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User9</p>
              </div>
              <div className={`Friends-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                <p className="Friends-item-label">User10</p>
              </div>
          </div>
          <div className="Messages-box">
            <div className={`Messages-box-header ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Messages-box-header-info">
                <div className="Logo"></div>
                <p className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>username</p>
              </div>
              <FontAwesomeIcon className={`Info-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faInfoCircle}/>
            </div>
            <div id='Conversation' className="Conversation" ref={messagesRef}>
              <div className={`Incoming-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className="Logo"></div>
                <p className="Message">Hey</p>
              </div>
              <div className={`Sent-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <p className="Message">How are u?</p>
              </div>
              <div className={`Incoming-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className="Logo"></div>
                <p className="Message">M fine wby?</p>
              </div>
              <div className={`Sent-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <p className="Message">Also</p>
              </div>
              <div className={`Incoming-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className="Logo"></div>
                <p className="Message">Nice to hear that</p>
              </div>
              <div className={`Sent-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <p className="Message">Ty</p>
              </div>
              <div className={`Incoming-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className="Logo"></div>
                <p className="Message">Ok bye</p>
              </div>
              <div className={`Sent-messages ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <p className="Message">Bye</p>
              </div>
            </div>
            <div className="Messages-form">
              <div className={`Input-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
                <input type="text" />
                <FontAwesomeIcon className={`Img-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faImage}/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Messages