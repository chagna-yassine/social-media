export const handleDropdownModal = ()=>{
    const dropdown = document.getElementById("Dropdown-Modal");
    const dropdownItems = document.querySelectorAll(".Dropdown-item");
    if(dropdown.style.visibility === "visible"){
        dropdown.style.visibility = "hidden"
        dropdown.style.height = 0;
        dropdown.style.opacity = 0;
        dropdownItems.forEach(item=>{
            item.style.paddingBlock = 0;
            item.style.height = 0;
            item.style.opacity = 0;
        })
    }else{
        dropdown.style.visibility = "visible"
        dropdown.style.height = "19vh";
        dropdown.style.opacity = 1;
        dropdownItems.forEach(item=>{
            item.style.paddingBlock = "6px";
            item.style.height = "6vh";
            item.style.opacity = 1;
        })
    }
}