import light_1 from "../Images/Light-1.jpeg";
import light_2 from "../Images/Light-2.jpeg";
import light_3 from "../Images/Light-3.jpeg";
import light_4 from "../Images/Light-4.jpeg";
import dark_1 from "../Images/Dark-1.jpeg";
import dark_2 from "../Images/Dark-2.jpeg";

export const handleBgImgs = (displayMode) =>{
    const lightImgsArr = [
        light_1,
        light_2,
        light_3,
        light_4,
    ];
    const darkImgArr = [
        dark_1,
        dark_2,
    ]
    const bgImg = document.getElementById('Login');
    if(displayMode === "light"){
        const randomImgIndex = parseInt(Math.random() * (lightImgsArr.length-1));
        const imgUrl = lightImgsArr[randomImgIndex];
        bgImg.style.backgroundImage = `url(${imgUrl})`;
    }else{
        const randomImgIndex = parseInt(Math.random() * (darkImgArr.length-1));
        const imgUrl = darkImgArr[randomImgIndex];
        bgImg.style.backgroundImage = `url(${imgUrl})`;
    }
    console.log(bgImg);
}