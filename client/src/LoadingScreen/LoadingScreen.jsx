import React, { useEffect } from 'react'
import "./LoadingScreen.css";
import { useCookies } from 'react-cookie';
import { handleBgImgs } from '../HandleBgImgs/handleBgImgs';

const LoadingScreen = () => {
    const [cookies] = useCookies(['displayMode']);
    const currentDisplayMode = cookies.displayMode || 'light';
    let isCanceled = false;
  useEffect(()=>{
    if(!isCanceled){
      document.title = "Loading...";
      handleBgImgs(currentDisplayMode,"Loading","Loading");
    }
    return ()=>{
      isCanceled = true;
    }
  },[currentDisplayMode])
  return (
    <div className='Loading'>
      <img id='Loading' loading='lazy' src="" alt="Loading" />
        <div className="Loading-container">
            <h1 className="Loading-label">loading...</h1>
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