import { darkImgArr, lightImgsArr , lightSmallImgsArr , darkSmallImgArr } from "./images";


const lightLength = lightImgsArr.length;
const darkLength = darkImgArr.length;
let imgUrl;

export const handleBgImgs = (displayMode,id,containerName) =>{

    const bgImg = document.getElementById(id);
    const imgContainer = document.getElementsByClassName(containerName)[0];

    if(displayMode === "light"){
        const randomImgIndex = parseInt(Math.random() * lightLength);
        imgUrl = lightImgsArr[randomImgIndex];
        imgContainer.style.backgroundImage = `url(${lightSmallImgsArr[randomImgIndex]})`
    }else{
        const randomImgIndex = parseInt(Math.random() * darkLength);
        imgUrl = darkImgArr[randomImgIndex];
        imgContainer.style.backgroundImage = `url('${darkSmallImgArr[randomImgIndex]}')`
    }
    bgImg.src = imgUrl;
    const loaded = ()=>{
        bgImg.classList.add("loaded");
    }
    if(bgImg.complete){
        loaded();
    }else{
        bgImg.addEventListener("load",loaded)
    }
}