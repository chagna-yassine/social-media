import { combineReducers } from "redux";
import { msgReducer } from "./Messages/reducer";
import { likeReducer } from "./Likes/reducer";
import { eventReducer } from "./Event/reducer";

export const rootReducer = combineReducers({
    messages: msgReducer,
    likes : likeReducer,
    event : eventReducer
});