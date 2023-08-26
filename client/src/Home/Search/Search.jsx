import React, { useEffect, useState } from 'react'
import "./Search.css"
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { search } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {

  const [ t , i18n ] = useTranslation("global");

  //To handle if the user click the enter button or the search icon or nothing
  const [isClicked,setIsClicked] = useState(false);

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const [userIdCookies] = useCookies(['userId']);
  const [userNameCookies] = useCookies(['username']);

  const navigate = useNavigate();

  //search states
  const [searchQuery,setSearchQuery] = useState('')
  const [users , setUsers] = useState([]);

  // function that get searched users from the api
  const handleSearch = async ()=>{
      const data = await search(searchQuery);
      setUsers(data)
  }

  //call the handleSearch when the user click enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setIsClicked(true)
    }
  };

  useEffect(()=>{
    //Check if the user not loged in and rederect him to the login
    if(!userCookies.token || !userIdCookies.userId || !userNameCookies.username){
      navigate("/login");
    }
    document.title = t("home.search");
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username])

  return (
    <div className='Search'>
        <div className={`Search-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
          <div className='w-75 position-relative'>
            <input type="text" placeholder={t("home.search")} onChange={(e)=>{setSearchQuery(e.target.value)}} onKeyPress={(e)=>{searchQuery && handleKeyPress(e)}}/>
            <FontAwesomeIcon className={`search-icon ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} icon={faSearch} onClick={()=>{searchQuery && handleSearch();setIsClicked(true);}}/>
          </div>
        </div>
        <div className="Results">
            {
              users.length > 0 ? 
              users.map(({_id,username})=>(
                <div key={_id} className={`Results-item cursor-pointer ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`} onClick={()=>{navigate(`/${username}`)}}>
                  <div className="Results-item-logo"></div>
                  <p className="Results-item-label">{username}</p>
                </div>
              ))
              : isClicked ? (
                <div className={`Results-item justify-content-center ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
                  <h3 className="Results-item-label text-center">User Not Found</h3>
                </div>
              )
              : null
            }
        </div>
    </div>
  )
}

export default Search