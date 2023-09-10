import React, { useCallback, useEffect, useState } from 'react';
import "../Profile/Profile.css";
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { IMG_BASE } from '../../App';
import { checkExistence } from '../../API/Auth/checkExistence';
import { getUser } from '../../API/User/getUser';
import { getPost } from '../../API/Post/getPost';
import { createConversation } from '../../API/Messages/createConversation';
import { checkFollow } from '../../API/Follow/checkFollow';
import { follow } from '../../API/Follow/follow';
import { unFollow } from '../../API/Follow/unFollow';
import Post from '../../Posts/Post';
import { useSelector } from 'react-redux';


const SearchedProfile = () => {
    //get the username from the ur param
    const {username} = useParams();
    const [user , setUser] = useState([]);
    const [conversation , setConversation] = useState([]);

    const [ t , i18n ] = useTranslation("global");

    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';
  
    //Declare user cookies
    const [userCookies] = useCookies(['token']);
    const [userIdCookies] = useCookies(['userId']);
    const [userNameCookies] = useCookies(['username']);

    const navigate = useNavigate();

    //follow states
    const [ followStatus , setFollowStatus ] = useState('');

    const [isLoading,setIsLoading] = useState(true);
    const [isUserDataLoaded,setIsUserDataLoaded] = useState(false);

     //Declare user post   
     const [postsCache, setPostsCahe] = useState([]);
     const [posts, setPosts] = useState([]);

    const likes = useSelector((state)=> state.likes);
  
    // function that send the username to the api and get his data
    //Use a callback hook to prevend multiple rerender in the useEffect hook
    const handeUserData = useCallback(async()=>{
        setUser(await getUser({username}));
        setIsUserDataLoaded(true)
    },[username,setUser])

    // function that check the follow status and set it to following or notFollowing
    //Use a callback hook to prevend multiple rerender in the useEffect hook
    const handleCheckFollow = useCallback(async()=>{
        const response = await checkFollow({
            follower : userIdCookies.userId, 
            following : user._id
        })
        setFollowStatus(response.message)
    },[setFollowStatus,userIdCookies.userId,user._id]);

    //a useEffect hook that handle the document title and the existens of the userCookies 
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
      //set the document title to the username
      document.title = `${username} - ${t("home.search.searchedProfil.title")}`;
      //call the function handeUserData when the component render and fetch the data
      handeUserData();
      //call the function handleCheckFollow when the component render to see the follow status
      !isLoading && handleCheckFollow();

      //function tha creat an conversation btween the user and searched user
      const handleConversation = async()=>{
        setConversation(await createConversation({
            first : userIdCookies.userId, 
            second : user._id
        }));
      }
      //call the handleConversation when the component is loaded
      !isLoading && handleConversation();

    },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username,username,handeUserData,handleCheckFollow,isLoading,user._id])
    //function that create a new follow by sending the id of the follower and the following
    const handleFollow = async()=>{
        await follow({
            follower : userIdCookies.userId, 
            following : user._id
        })

        //call the function handleCheckFollow to update the follow status
        handleCheckFollow();
    }

    //function that delete a follow by sending the id of the follower and the following
    const handleUnFollow = async()=>{
        await unFollow({
            follower : userIdCookies.userId, 
            following : user._id
        })

        //call the function handleCheckFollow to update the follow status
        handleCheckFollow();
    }

     //function that redirect the user to the searched user conversation
     const handleMessage = async()=>{
        conversation && navigate(`/messages/${await conversation.username}/${await conversation.id}`)
    };

    const handleGetPostCahe = async () => {
        try {
            const user_id = user._id;
            const response = await getPost(user_id);
            setPostsCahe(response);
            console.log(user_id);
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
      };
    
      const handleGetPost = ()=>{
            setPosts(postsCache)
        }
    
      useEffect(() => {
            isLoading  ? isUserDataLoaded &&  handleGetPostCahe() :
            !isLoading && postsCache.length > 0 && handleGetPost();
        }, [likes,isLoading,postsCache,isUserDataLoaded]);
    console.log(posts);
    return (
        //Handle if the component is Fully loading
        !isLoading && (
            <div className='Profile-container'>
        <div className="Profile Searched">
          <div className="Profile-cover">
            <img src={ IMG_BASE+user.cover } alt={user.username} />
          </div>
          <div className={`Profile-pic ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
            <img src={ IMG_BASE+user.profilePic } alt={user.username} />
          </div>
          <div className={`Profile-info ${i18n.language === "ar" ? "ar" : null}`}>
            <h3 className={`Profile-name ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{user.username}</h3>
            <p className={`Profile-bio ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>{user.bio}</p>
          </div>
          <div className={`Profile-actions ${i18n.language === "ar" ? "ar" : i18n.language === "fr" ? "fr" : null}`}>
             {
                // if the follow status is notFollowing show the following btn else show the unFollow btn
                !isLoading && followStatus === 'notFollowing' ? (
                    <button className={`Add-post Follow ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={handleFollow}>{t("home.search.searchedProfil.follow")}</button>
                )
                :(
                    <button className={`Add-post Unfollow ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={handleUnFollow}>{t("home.search.searchedProfil.unfollow")}</button>
                )
             }
             <button className={`Edit-Profile ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={handleMessage}>{t("home.search.searchedProfil.msg")}</button>
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
                )): (
                  <h2 className='noPost'>Create your first post</h2>
              )
            }
        </ul>
      </div>
        )
    )
}

export default SearchedProfile;