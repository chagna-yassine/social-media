import { faMoon } from "@fortawesome/free-regular-svg-icons";

export const handleSwitcher = (mode)=>{
    if(mode === "light"){
        const switcher = document.getElementById('Slider');
        const switcherIcon = document.getElementById('Slider-icon');
        switcher.style.backgroundColor = "var(--light-gray)";
        switcher.style.color = "var(--white)";
        switcher.style.border = "1px solid var(--dark)";
        switcherIcon.style.backgroundColor = "var(--light-dark)";
        switcherIcon.style.border = "1px solid var(--dark)";
        switcherIcon.style.transform = "translateX(100%)";
        return "dark";
    }else{
        const switcher = document.getElementById('Slider');
        const switcherIcon = document.getElementById('Slider-icon');
        switcher.style.backgroundColor = "var(--light-blue)";
        switcher.style.color = "var(--light-green)";
        switcher.style.border = "1px solid var(--dark-blue)";
        switcherIcon.style.backgroundColor = "var(--white)";
        switcherIcon.style.border = "1px solid var(--dark-blue)";
        switcherIcon.style.transform = "translateX(0%)";
        return "light";
    }
}