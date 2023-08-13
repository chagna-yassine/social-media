import React from 'react'
import './TopMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import {useCookies} from 'react-cookie';
const TopMenu = () => {
    const [cookies, setCookie] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';

    const handleDisplayMode = ()=>{
        const newDisplayMode = currentDisplayMode === 'light' ? 'dark' : 'light';
        setCookie('displayMode', newDisplayMode, { path: '/' });
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
    </div>
  )
}

export default TopMenu