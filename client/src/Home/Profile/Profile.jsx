import React, {  useEffect, useState } from 'react';
import "./Profile.css";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IMG_BASE } from '../../App';
import EditProfil from './EditProfil';
import { checkExistence } from '../../API/Auth/checkExistence';
import { getUser } from '../../API/User/getUser';
import { getPost } from '../../API/Post/getPost';
import { checkLike } from '../../API/Like/checkLike';
import { countLike } from '../../API/Like/countLike';
import { countComment } from '../../API/Comment/countComment';
import Post from '../../Posts/Post';
import { useSelector } from 'react-redux';

const Profile = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  //Declare user post   
  const [postsCache, setPostsCahe] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(true);
  const [userDataLoaded,setUserDataLoaded] = useState(false);

  const [user , setUser] = useState([]);
  const [display , setDisplay] = useState('none');

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
    document.title = `${userNameCookies.username} - ${t("home.profile.label")}`;
    const handeUserData = async()=>{
        setUser(await getUser({ username: userNameCookies.username }));
        setUserDataLoaded(true)
    }
    isLoading && handeUserData();
    setIsLoading(false)
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username])
  
  // geting all the post for the user 
  const handleGetPostCahe = async () => {
    try {
        const user_id = userIdCookies.userId;
        const response = await getPost(user_id);
        setPostsCahe(response);
    } catch (error) {
        console.error(error);
    }
  };

  const handleGetPost = ()=>{
        setPosts(postsCache)
    }

  useEffect(() => {
        isLoading && handleGetPostCahe();
        !isLoading && postsCache.length > 0 && handleGetPost();
    }, [likes,isLoading,postsCache]);

  return (
     !isLoading && (
        <div className='Profile-container'>
            {
                userDataLoaded && (<EditProfil userData={user} display={display} setDisplay={setDisplay}/>)
            }
        <div className="Profile">
            <div className="Profile-cover">
                <img src={userDataLoaded ? IMG_BASE+user.cover : undefined} alt={userDataLoaded && user.username} />
            </div>
            <div className={`Profile-pic ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
                <img src={userDataLoaded ? IMG_BASE+user.profilePic : undefined} alt={userDataLoaded && user.username} />
            </div>
            <div className={`Profile-info ${i18n.language === "ar" ? "ar" : null}`}>
            <h3 className={`Profile-name ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{userDataLoaded && user.username}</h3>
            <p className={`Profile-bio ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{userDataLoaded && user.bio}</p>
            </div>
            <div className={`Profile-actions ${i18n.language === "ar" ? "ar" : i18n.language === "fr" ? "fr" : null}`}>
            <button className={`Add-post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}><Link to="/addPost" className='text-decoration-none'>{t("home.profile.add")}</Link></button>
            <button className={`Edit-Profile ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={()=>{display === 'none' ? setDisplay('block') : setDisplay('none')}}>{t("home.profile.edit")}</button>
            </div>
        </div>
        <h4 className='Post-Label'>{t("home.profile.posts")}</h4>
        <ul className={`list-group Post-List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            {
             posts.length > 0 ? posts.map((post,index)=>(
                    <Post 
                        post={post} 
                        currentDisplayMode={currentDisplayMode} 
                        index={index} 
                        feed={posts}
                        isLoading={isLoading}
                    />
                )) : (
                    <h2 className='noPost'>Create your first post</h2>
                )
            }
        </ul>
        </div>
        )
    )
}

export default Profile