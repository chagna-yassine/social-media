import { ADD_LIKE, REMOVE_LIKE } from "./types"

export const addLike = (likeData = {})=>{
    return{
        type: ADD_LIKE,
        playload: likeData,
    }
}
export const removeLike = (likeData = {})=>{
    return{
        type: REMOVE_LIKE,
        playload: likeData,
    }
}