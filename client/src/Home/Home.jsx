import React, { useEffect, useState } from 'react'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../HandleBgImgs/handleBgImgs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMessage, faSquarePlus, faUser  } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleNotifications } from './HomeFonctionalities';
import { useTranslation } from 'react-i18next';
import { checkExistence, event, getEvent } from '../api';
import { sendAlert } from '../Posts/notifAlert';

const Home = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  const [events, setEvent] = useState([]);
  const evnt = useSelector((state)=> state.event);

  const navigate = useNavigate();

  const handleGetEvent = async () =>{
    // setEvent(await getEvent());
    const E = await getEvent();

    const filteredEvents = E.filter(event => event.to.includes(userIdCookies.userId));
    setEvent(filteredEvents);
  }

  useEffect(()=>{
      //Check if the user not loged in and rederect him to the login
      const checkUserInfo = async()=>{
        if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
          navigate("/login");
        }else{
            const response = await checkExistence({userId: userIdCookies.userId , username : userNameCookies.username})
            console.log(response);
          if(!response.isExist){
            navigate("/login");
          }
        }
      }
    checkUserInfo();
    
    handleBgImgs(currentDisplayMode,"Main-img","Main");
  },[currentDisplayMode,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username])

  useEffect(()=>{
    handleGetEvent();
    console.log("events :", events);
  },[evnt])

  return (
    <div id='Main' className='Main'>
        <img id='Main-img' loading='lazy' src='' alt="Signup" />
        <div className={`Main-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <div className={`Feed-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <Outlet/>
            </div>
            <div className="Side-bar-header-icon-container">
                <FontAwesomeIcon className='Side-bar-header-icon' icon={faBell} onClick={handleNotifications}/>
            </div>
            <div id='Notification' className={`Side-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className='Side-bar-content'>
                <div className="Side-bar-header">
                    <div className={`Side-bar-header-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}><h5>{t("home.main.notif")}</h5></div>
                    <div className="Side-bar-header-icon-container">
                        <FontAwesomeIcon className='Side-bar-header-icon' icon={faBell}/>
                    </div>
                </div>
                <ul id='Notification-list' className="list-group List">
                {events.map((event, index) => (
                  <li key={index} >
                    <strong>From:</strong> {event.from}<br />
                    <strong>To:</strong> {event.to}<br />
                    <strong>Type:</strong> {event.type}<br />
                    <strong>Created At:</strong> {event.createAt}<br />
                  </li>
                ))}
                {events.map((event) =>
                  event.seen === false ? () => sendAlert(event) : null
                )}
                  {/* <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.like")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.cmnt")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.share")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>{t("home.main.msg")} User</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.like")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.cmnt")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.share")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>{t("home.main.msg")} User</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.like")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.cmnt")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>User {t("home.main.share")}</li>
                  <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>{t("home.main.msg")} User</li> */}
                </ul>
                <ul>
                
                </ul>
              </div>
            </div>
            <div className={`bottom-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className="bottom-bar-item">
                <Link to="main"><FontAwesomeIcon className='bottom-bar-item-icon' icon={faHouse}/></Link>
              </div>
              <div className="bottom-bar-item">
                <Link to="search"><FontAwesomeIcon className='bottom-bar-item-icon' icon={faMagnifyingGlass}/></Link>
              </div>
              <div className="bottom-bar-item">
                <Link to="addPost"><FontAwesomeIcon className='bottom-bar-item-icon' icon={faSquarePlus}/></Link>
              </div>
              <div className="bottom-bar-item">
                <Link to="messages"><FontAwesomeIcon className='bottom-bar-item-icon' icon={faMessage}/></Link>
              </div>
              <div className="bottom-bar-item">
                <Link to="profile"><FontAwesomeIcon className='bottom-bar-item-icon' icon={faUser}/></Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home
