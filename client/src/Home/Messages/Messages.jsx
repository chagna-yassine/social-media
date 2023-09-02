import React, { useEffect, useState } from 'react'
import "./Messages.css";
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { checkExistence, getConversations } from '../../api';
import { useSelector } from 'react-redux';

const Messages = () => {

//handle the translation
  const [ t , i18n ] = useTranslation("global");

//handle display cookies
  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

//Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

//handle the navigation
  const navigate = useNavigate();

//users arr state
  const [users,setUsers] = useState([])

//Handle loading state 
  const [isLoading,setIsLoading] = useState(true);

//
const msg = useSelector((state)=> state.messages);
  

  useEffect(() => {
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
    document.title = t("home.msgs.title");

  // function that get the conversations that the user participate in and set the loading state to false when the conversations loaded
    const handleUsers = async()=>{
      setUsers(await getConversations({userId : userIdCookies.userId}));
      setIsLoading(false);
    }
  //Call the handleUsers when the component load to fetch the data
    handleUsers();
  }, [t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,setIsLoading,msg]);

  return (
    //Handle if the component is Fully loading
    !isLoading && (
      <div className='Messages'>
        <div className={`Messages-header ${i18n.language === "ar" ? "ar" : null}`}>
          <h4 className={`Messages-header-label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{t("home.msgs.title")}</h4>
        </div>
        <div className={`Messages-container ${i18n.language === "ar" ? "ar" : null}`}>
          <div className={`Friends ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              {
                //Check if the user have any conversation if his have a one or more load the conversations
                //else show no conversation message
                users ? users.map(({ _id , username},index)=>(
                  //if the user click on an conversation redirect him to the conversation msgs 
                  <div key={index} className={`Friends-item cursor-pointer ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={()=>{navigate(`${username[0].username}/${_id}`)}}>
                    <div className={`Friends-item-logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                    <p className="Friends-item-label">{username[0].username}</p>
                  </div>
                )): (
                  <div className={`NoConversation ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
                    <div>
                      <h5>{t('home.msgs.noConv.heading')}</h5>
                      <p>{t('home.msgs.noConv.par')}</p>
                    </div>
                  </div>
                )
              }
          </div>
          <Outlet/>
        </div>
    </div>
    )
  )
}

export default Messages