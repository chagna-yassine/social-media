import React from 'react'
import './TopMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import {useCookies} from 'react-cookie';
import { handleDropdown } from './topMenuFonctionalities';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const TopMenu = () => {

    const [cookies, setCookie] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';

    const [langCookies, setLangCookie] = useCookies(['language']);

    const translate = useTranslation();

    //Declare user cookies
    const userCookies = useCookies(['token']);
    const userIdCookies = useCookies(['userId']);
    const userNameCookies = useCookies(['username']);

    const navigate = useNavigate();

    const handleDisplayMode = ()=>{
        const newDisplayMode = currentDisplayMode === 'light' ? 'dark' : 'light';
        setCookie('displayMode', newDisplayMode, { path: '/' });
    } 

    const handleLanguage = (lang = langCookies.language)=>{
        translate.i18n.changeLanguage(lang);
        const newLanguage = lang;
        setLangCookie('language', newLanguage, { path: '/' });
    }

    const handleLogout = ()=>{
        //remove user cookies and rederict him to the login page
        userCookies[1]('token','');
        userIdCookies[1]('userId','');
        userNameCookies[1]('username','');
        navigate('/login')
    }
    
  return (
    <div className='TopMenu'>
        <div className="DisplayMode">
            <div className='Switch-container'>
                <input type="checkbox" />
                <span className='Slider'>
                    <div id='Slider' className={`Slider-icon-container ${currentDisplayMode === 'light' ? 'dark' : 'light'}`}>
                        <FontAwesomeIcon 
                            id='Slider-icon' 
                            className={`Slider-icon ${currentDisplayMode === 'light' ? 'dark' : 'light'}`}
                            icon={currentDisplayMode === 'light' ? faSun : faMoon} 
                            onClick={handleDisplayMode}
                        />
                    </div>
                </span>
            </div>
        </div>
        <div className="Dropdown">
            <svg className="Dropdown-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" onClick={handleDropdown}><path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z"/></svg>
            <div className="Dropdown-list">
                <div id="Dropdown-items" className={`Dropdown-items ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <p className="Dropdown-item"onClick={()=>{handleLanguage("en");handleDropdown()}}>en</p>
                    <p className="Dropdown-item"onClick={()=>{handleLanguage("fr");handleDropdown()}}>fr</p>
                    <p className="Dropdown-item"onClick={()=>{handleLanguage("ar");handleDropdown()}}>ar</p>
                </div>
            </div>
        </div>
        {
            userCookies[0].token && (
                <div className="Logout">
                    <button className={`btn Logout-btn ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`} onClick={handleLogout}>Logout</button>
                </div>
            )
        }
    </div>
  )
}

export default TopMenu