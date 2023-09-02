export const handleRemoveModal = (id)=>{
    const modal = document.getElementById(`Remove-Modal-${id}`);
    if(modal.style.visibility === "visible"){
        modal.style.visibility = "hidden"
        modal.style.opacity = 0;
    }else{
        modal.style.visibility = "visible"
        modal.style.opacity = 1;
    }
}