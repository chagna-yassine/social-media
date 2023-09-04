import { LIKE, COMMENT, FOLLOW, MESSAGE, POST } from "./type"

const initialState = {
        from : '',
        to : '',
}

export const eventReducer = (state  = initialState , action)=>{
    switch(action.type){
        case LIKE:
            return {
                data:{
                    from : action.playload.from,
                    to : action.playload.to,
                }
            };
        case COMMENT:
            return {
                data:{
                    from : action.playload.from,
                    to : action.playload.to,
                }
            };
        case FOLLOW:
            return {
                data:{
                    from : action.playload.from,
                    to : action.playload.to,
                }
            };
        case MESSAGE:
        return {
            data:{
                from : action.playload.from,
                to : action.playload.to,
            }
        };
        case POST:
        return {
            data:{
                from : action.playload.from,
                to : action.playload.to,
            }
        };
        default : return state;
    }
}