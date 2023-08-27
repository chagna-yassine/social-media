import React, { useEffect, useState } from 'react'
import "./Messages.css";
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { getConversations, getMyDms } from '../../api';

const Messages = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  const navigate = useNavigate();

  const [users,setUsers] = useState([])
  const [isLoading,setIsLoading] = useState(true);
  

  useEffect(() => {
    //Check if the user not loged in and rederect him to the login
    if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
      navigate("/login");
    }
    document.title = t("home.msgs");

    const handleUsers = async()=>{
      setUsers(await getConversations({userId : userIdCookies.userId}));
      setIsLoading(false);
    }
    handleUsers();
  }, [t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,setIsLoading]);

  return (
    <div className='Messages'>
        <div className={`Messages-header ${i18n.language === "ar" ? "ar" : null}`}>
          <h4 className={`Messages-header-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.msgs")}</h4>
        </div>
        <div className={`Messages-container ${i18n.language === "ar" ? "ar" : null}`}>
          <div className={`Friends ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              {
                !isLoading && users.myConversations.map(({participants},index)=>(
                  <div key={index} className={`Friends-item cursor-pointer ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={()=>{navigate(`${participants.second.username}`)}}>
                    <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                    <p className="Friends-item-label">{participants.second.username}</p>
                  </div>
                ))
              }
          </div>
          <Outlet/>
        </div>
    </div>
  )
}

export default Messages