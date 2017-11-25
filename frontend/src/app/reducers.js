import { combineReducers } from 'redux';
import { postsBySubreddit, selectedSubreddit} from "../posts/PostReducers";


const rootReducer = combineReducers({
	postsBySubreddit,
	selectedSubreddit
});

export default rootReducer;