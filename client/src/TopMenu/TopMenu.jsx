import React, { useState } from 'react'
import './TopMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { handleSwitcher } from './TopMenuFunctionalities'

const TopMenu = () => {
    const [displayMode,setDisplayMode] = useState("light");
  return (
    <div className='TopMenu'>
        <div className="DisplayMode">
            <div className='Switch-container'>
                <input type="checkbox" />
                <span className='Slider'>
                    <div id='Slider' className="Slider-icon-container">
                        <FontAwesomeIcon id='Slider-icon' 
                                         className='Slider-icon' 
                                         icon={displayMode == 'light' ? faSun : faMoon} 
                                         onClick={()=>{setDisplayMode(handleSwitcher(displayMode))}}
                        />
                    </div>
                </span>
            </div>
        </div>
    </div>
  )
}

export default TopMenu