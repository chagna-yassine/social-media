import { SEND_MESSAGE } from "./types"

export const sendMsg = (msgData = {})=>{
    return{
        type: SEND_MESSAGE,
        playload: msgData,
    }
}