import { combineReducers } from 'redux';
import { postsBySubreddit, selectedSubreddit} from "../posts/PostReducers";
import { allCategories } from "../categories/CategoryReducers"


const rootReducer = combineReducers({
	postsBySubreddit,
	selectedSubreddit,
	allCategories
});

export default rootReducer;