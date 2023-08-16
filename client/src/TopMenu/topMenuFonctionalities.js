
export const handleDropdown = ()=>{
    const dropdown = document.getElementById("Dropdown-items");
    const dropdownItems = document.querySelectorAll(".Dropdown-item");
    if(dropdown.style.visibility === "visible"){
        dropdown.style.visibility = "hidden"
        dropdown.style.height = 0;
        dropdownItems.forEach(item=>{
            item.style.opacity = 0;
        })
    }else{
        dropdown.style.visibility = "visible"
        dropdown.style.height = "19.5vh";
        dropdownItems.forEach(item=>{
            item.style.opacity = 1;
        })
    }
}