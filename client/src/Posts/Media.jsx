import React, { useEffect, useRef, useState } from 'react';
import { IMG_BASE, VID_BASE } from '../App';
import { faX } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Media = ({ status , url , name , poster_url , text , _id }) => {

  const [isFade,setIsFade] = useState(false)
  const imgRef = useRef();
  const [currentPreviewImg,setCurrentPreviewImg] = useState(null)

  const handleImgPreview = (id)=>{
    $(`#img-${id}`).fadeToggle();
    setIsFade(!isFade);
    $('.Feed-container').css('overflow-y', 'hidden');
    imgRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (currentPreviewImg !== null) {
      handleImgPreview(currentPreviewImg);
    }
  }, [currentPreviewImg]);

  return (
    <>
        {
            status === 'noMedia' ? (
                <p className="card-img-top Post-content-text text-white d-flex justify-content-center align-items-center">{text}</p>
            ): status === 'image' ?(
                <>
                    <p className='m-0 text-white ms-4 fw-bold fs-5 text-small-caps'>{text}</p>
                    <img src={IMG_BASE+url} className="card-img-top Post-content-img" ref={currentPreviewImg === _id ? imgRef : undefined} alt={name} onClick={()=>{setCurrentPreviewImg(_id);}}/>
                    <div id={`img-${_id}`} className={`img-preview ${currentPreviewImg === _id && isFade ? "fade-in" : "fade-out"}`}>
                    <img src={IMG_BASE+url} className="card-img-top" alt={name}/>
                    <div onClick={()=>{$(`#img-${_id}`).fadeToggle();setIsFade(!isFade);$('.Feed-container').css('overflow-y', 'scroll');setCurrentPreviewImg(null)}}>
                        <FontAwesomeIcon className='closePreview' icon={faX} />
                    </div>
                    </div>
                </>
            ):(
                <>
                    <p className='m-0 text-white ms-4 fw-bold fs-5 text-small-caps'>{text}</p>
                    <video className="card-img-top Post-content-video" src={VID_BASE+url} title={name} controls loop preload='none' muted poster={IMG_BASE+poster_url}></video>
                </>
            )
        }
    </>
  )
}

export default Media;