export const handleCommentModal = (id)=>{
    const dropdown = document.getElementById(`Comment-Modal-${id}`);
    const dropdownItems = document.querySelectorAll(".Comment-item");
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
        dropdown.style.height = "90%";
        dropdown.style.opacity = 1;
        dropdownItems.forEach(item=>{
            item.style.paddingBlock = "6px";
            item.style.height = "6h";
            item.style.opacity = 1;
        })
    }
}