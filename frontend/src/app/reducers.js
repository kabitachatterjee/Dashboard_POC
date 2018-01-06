import { combineReducers } from 'redux';
import {postsByCategory, singlePostDetails, votesByPostId} from "../posts/PostReducers";
import {allCategories, selectedCategory} from "../categories/CategoryReducers"
import {allComments} from "../comments/CommentReducers";

const rootReducer = combineReducers({
	postsByCategory,
	selectedCategory,
	allCategories,
	allComments,
	singlePostDetails,
});

export default rootReducer;