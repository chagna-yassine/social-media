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

  const [isLoading,setIsLoading] = useState(true);

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
  const [isDataLoading,setIsDataLoading] = useState(true);

  // function that get searched users from the api
  const handleSearch = async ()=>{
      const data = await search({searchQuery , userId : userIdCookies.userId});
      setUsers(data);
      setIsDataLoading(false)
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
    document.title = t("home.search.title");
    setIsLoading(false)
  },[t,navigate,userCookies.token,userIdCookies.userId,userNameCookies.username])

  return (
    !isLoading && (
      <div className='Search'>
        <div className={`Search-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
          <div className='w-75 position-relative'>
            <input type="text" placeholder={t("home.search.title")} onChange={(e)=>{setSearchQuery(e.target.value)}} onKeyPress={(e)=>{searchQuery && handleKeyPress(e)}}/>
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
              : isClicked && !isDataLoading ? (
                <div className={`Results-item justify-content-center ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
                  <h3 className="Results-item-label text-center">{t('home.search.notFound')}</h3>
                </div>
              )
              : (
                <h1 className={`useSearchBar ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`} >{t('home.search.info')}</h1>
              )
            }
        </div>
    </div>
    )
  )
}

export default Search