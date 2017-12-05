import { combineReducers } from 'redux';
import { postsBySubreddit} from "../posts/PostReducers";
import {allCategories, selectedCategory} from "../categories/CategoryReducers"


const rootReducer = combineReducers({
	postsBySubreddit,
	selectedCategory,
	allCategories
});

export default rootReducer;