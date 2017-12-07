import { combineReducers } from 'redux';
import { postsByCategory} from "../posts/PostReducers";
import {allCategories, selectedCategory} from "../categories/CategoryReducers"


const rootReducer = combineReducers({
	postsByCategory,
	selectedCategory,
	allCategories
});

export default rootReducer;