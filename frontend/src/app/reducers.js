import { combineReducers } from 'redux';
import {postsByCategory, postSortReducer, singlePostDetails} from "./actions/AudienceReducers";
import {allCategories, selectedCategory} from "./actions/CategoryReducers"
import {allComments} from "../comments/CommentReducers";

const rootReducer = combineReducers({
	postsByCategory,
	selectedCategory,
	allCategories,
	allComments,
	singlePostDetails,
	postSortReducer
});

export default rootReducer;
