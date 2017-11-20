import { combineReducers } from 'redux';
import PostReducer from "../posts/PostReducers";

const rootReducer = combineReducers({
	posts: PostReducer()
});

export default rootReducer;
