import { RECEIVE_MESSAGE, SEND_MESSAGE } from "./types"

export const sendMsg = (msgData = {})=>{
    return{
        type: SEND_MESSAGE,
        playload: msgData,
    }
}

export const receiveMsg = (msgData = {})=>{
    return{
        type: RECEIVE_MESSAGE,
        playload: msgData,
    }
}