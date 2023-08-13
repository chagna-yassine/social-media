import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const handleViewPassword = (id)=>{
    const pwdInput = document.querySelector(`#${id}`);
    if(pwdInput.type === "password"){
        pwdInput.type = "text";
        return faEyeSlash;
    }else{
        pwdInput.type = "password"
        return faEye;
    };
};