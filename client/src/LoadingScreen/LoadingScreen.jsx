import React, { useEffect } from 'react'
import "./LoadingScreen.css";
import { useCookies } from 'react-cookie';
import { handleBgImgs } from '../HandleBgImgs/handleBgImgs';
import { useTranslation } from 'react-i18next';

const LoadingScreen = () => {

    const [ t ] = useTranslation("global")

    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';

  useEffect(()=>{
      document.title = t("loading");
      handleBgImgs(currentDisplayMode,"Loading","Loading");
  },[currentDisplayMode , t])

  return (
    <div className='Loading'>
      <img id='Loading' loading='lazy' src="" alt="Loading" />
        <div className="Loading-container">
            <h1 className="Loading-label">{t("loading")}</h1>
            <div className='Loading-bar'>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
                <span className="Bars"></span>
        </div>
        </div>
    </div>
  )
}

export default LoadingScreen