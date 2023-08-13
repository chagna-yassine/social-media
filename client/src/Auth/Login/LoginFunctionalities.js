import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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