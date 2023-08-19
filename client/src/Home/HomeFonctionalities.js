export const handleNotifications = ()=>{
    const dropdown = document.getElementById("Notification");
    const notificationList = document.getElementById("Notification-list");
    const dropdownItems = document.querySelectorAll(".Side-bar .List-item");
    if(dropdown.style.visibility === "visible"){
        dropdown.style.visibility = "hidden"
        dropdown.style.height = 0;
        dropdown.style.opacity = 0;
        dropdownItems.forEach(item=>{
            item.style.visibility = "hidden";
        })
        notificationList.style.visibility = "hidden"
        notificationList.style.maxHeight = 0;
    }else{
        notificationList.style.visibility = "visible"
        notificationList.style.maxHeight = "65vh";
        dropdown.style.visibility = "visible"
        dropdown.style.height = "70vh";
        dropdown.style.opacity = 1;
        dropdownItems.forEach(item=>{
            item.style.visibility = "visible";
        })
    }
}
