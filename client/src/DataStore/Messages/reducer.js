import { RECEIVE_MESSAGE, SEND_MESSAGE } from "./types"

const initialState = {
    from : '',
    to : '',
    msg : '',
}

export const msgReducer = (state  = initialState , action)=>{
    switch(action.type){
        case SEND_MESSAGE:
            return {
                from : action.playload.from,
                to : action.playload.to,
                msg : action.playload.msg,
            };
            case RECEIVE_MESSAGE:
                return {
                    from : action.playload.from,
                    to : action.playload.to,
                    msg : action.playload.msg,
                };
                default : return state;
    }
}