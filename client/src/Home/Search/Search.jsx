import React, { useEffect } from 'react'
import "./Search.css"
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Search = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //Declare user cookies
  const [userCookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(()=>{
    //Check if the user not loged in and rederect him to the login
    if(!userCookies.token){
      navigate("/login");
    }
    document.title = t("home.search");
  },[t,navigate,userCookies.token])

  return (
    <div className='Search'>
        <div className={`Search-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
          <input type="text" placeholder={t("home.search")}/>
        </div>
        <div className="Results">
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User1</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User2</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User3</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User4</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User5</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User6</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User7</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User8</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User9</p>
            </div>
            <div className={`Results-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
              <div className="Results-item-logo"></div>
              <p className="Results-item-label">User10</p>
            </div>
        </div>
    </div>
  )
}

export default Search