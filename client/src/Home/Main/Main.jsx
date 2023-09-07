import React, { useEffect, useState } from 'react';
import "./Main.css";
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Post from '../../Posts/Post';
import { checkExistence } from '../../API/Auth/checkExistence';
import { getFeed } from '../../API/Feed/feed';


const Main = () => {

    const [ t ] = useTranslation("global");

    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';

    //Declare user cookies
    const [userCookies] = useCookies(['token']);
    const [userIdCookies] = useCookies(['userId']);
    const [userNameCookies] = useCookies(['username']);

    const navigate = useNavigate();

    //Handle loading state
    const [isLoading,setIsLoading] = useState(true);

    const [feed,setFeed] = useState([]);
    const [feedCache,setFeedCache] = useState([]);

    const likes = useSelector((state)=> state.likes);

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

        document.title = t("home.main.label");
        //Set the loading state to false when the component load
        setIsLoading(false)
    },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username])

    const handleFeedCache = async()=>{
        const user_id = userIdCookies.userId;
        const response = await getFeed(user_id);
        setFeedCache(response)
    }

    const handleFeed = ()=>{
        setFeed(feedCache)
    }

    useEffect(() => {
        isLoading && handleFeedCache();
        !isLoading && feedCache.length > 0 && handleFeed();
    }, [likes,isLoading,feedCache]);

  return (
    //Handle if the component is Fully loading
    !isLoading &&(
        <ul className={`list-group Post-List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            {
             feed.map((post,index)=>(
                    <Post 
                        post={post} 
                        currentDisplayMode={currentDisplayMode} 
                        index={index} 
                        feed={feed}
                        isLoading={isLoading}
                    />
                ))
            }
      </ul>
    )
  )
}
export default Main;