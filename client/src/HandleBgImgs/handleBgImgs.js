import light_1 from "../Images/Light-1.jpeg";
import light_2 from "../Images/Light-2.jpeg";
import light_3 from "../Images/Light-3.jpeg";
import light_4 from "../Images/Light-4.jpeg";
import light_5 from "../Images/Light-5.jpeg";
import light_6 from "../Images/Light-6.jpeg";
import dark_1 from "../Images/Dark-1.jpeg";
import dark_2 from "../Images/Dark-2.jpeg";
import dark_3 from "../Images/Dark-3.jpeg";
import dark_4 from "../Images/Dark-4.jpeg";
import dark_5 from "../Images/Dark-5.jpeg";

export const handleBgImgs = (displayMode) =>{
    const lightImgsArr = [
        light_1,
        light_2,
        light_3,
        light_4,
        light_5,
        light_6,
    ];
    const darkImgArr = [
        dark_1,
        dark_2,
        dark_3,
        dark_4,
        dark_5,
    ]
    const bgImg = document.getElementById('Login');
    if(displayMode === "light"){
        const randomImgIndex = parseInt(Math.random() * (lightImgsArr.length));
        const imgUrl = lightImgsArr[randomImgIndex];
        bgImg.style.backgroundImage = `url(${imgUrl})`;
    }else{
        const randomImgIndex = parseInt(Math.random() * (darkImgArr.length));
        const imgUrl = darkImgArr[randomImgIndex];
        bgImg.style.backgroundImage = `url(${imgUrl})`;
    }
    console.log(bgImg);
}