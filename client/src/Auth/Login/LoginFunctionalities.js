import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import bgImg_1 from "../../Images/Login-bg-1.jpg";
import bgImg_2 from "../../Images/Login-bg-2.jpeg";
import bgImg_3 from "../../Images/Login-bg-3.jpeg";
import bgImg_4 from "../../Images/Login-bg-4.jpeg";

export const handleViewPassword = ()=>{
    const pwdInput = document.querySelector('#password');
    if(pwdInput.type === "password"){
        pwdInput.type = "text";
        return faEyeSlash;
    }else{
        pwdInput.type = "password"
        return faEye;
    };
};
export const handleBgImgs = () =>{
    const imgsArr = [
        bgImg_1,
        bgImg_2,
        bgImg_3,
        bgImg_4,
    ];
    const randomImgIndex = parseInt(Math.random() * (imgsArr.length-1));
    const bgImg = document.getElementById('Login');
    const imgUrl = imgsArr[randomImgIndex];
    bgImg.style.backgroundImage = `url(${imgUrl})`;
    console.log(bgImg);
}