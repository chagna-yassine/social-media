import { ADD_LIKE, REMOVE_LIKE } from "./types"

const initialState = {
        from : '',
        post : '',
}

export const likeReducer = (state  = initialState , action)=>{
    switch(action.type){
        case ADD_LIKE:
            return {
                data:{
                    from : action.playload.from,
                    post : action.playload.post,
                }
            };
            case REMOVE_LIKE:
                return {
                    data:{
                        from : action.playload.from,
                        post : action.playload.post,
                    }
                };
                default : return state;
    }
}