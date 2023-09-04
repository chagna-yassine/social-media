import { LIKE, COMMENT, FOLLOW, MESSAGE, POST } from "./type"

export const newLike = (likeData = {})=>{
    return{
        type: LIKE,
        playload: likeData,
    }
}
export const newComment = (likeData = {})=>{
    return{
        type: COMMENT,
        playload: likeData,
    }
}
export const newFollow = (likeData = {})=>{
    return{
        type: FOLLOW,
        playload: likeData,
    }
}
export const newMessage = (likeData = {})=>{
    return{
        type: MESSAGE,
        playload: likeData,
    }
}
export const newPost = (likeData = {})=>{
    return{
        type: POST,
        playload: likeData,
    }
}