import { combineReducers } from "redux";
import { msgReducer } from "./Messages/reducer";
import { likeReducer } from "./Likes/reducer";

export const rootReducer = combineReducers({
    messages: msgReducer,
    likes : likeReducer
});