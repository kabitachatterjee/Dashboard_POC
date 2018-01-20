import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	RECEIVE_SINGLE_POST, REQUEST_SINGLE_POST, EDIT_POST, ADD_POST, REQUEST_VOTE_POST, RECEIVE_VOTE_POST,
	RECEIVE_DELETE_POST, DELETE_POST, SET_SORTING
} from './PostAction'
import {SELECT_CATEGORY} from "../categories/CategoryAction";

export function postsByCategory(state = {}, action) {
	switch (action.type) {
		case RECEIVE_POSTS:
		case REQUEST_POSTS:
		case EDIT_POST:
		case RECEIVE_VOTE_POST:
		case RECEIVE_DELETE_POST:
		case SELECT_CATEGORY:
			const defaultCategory = (!action.category) ? 'all' : action.category;
			return Object.assign({}, state, {
				[defaultCategory]: posts(state[action.category], action)
			});
		default:
			return state
	}
}

function posts(
	state = {
		isFetching: false,
		didInvalidate: false,
		items: []
	},
	action
) {
	switch (action.type) {
		case REQUEST_POSTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case RECEIVE_POSTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.posts,
				lastUpdated: action.receivedAt
			});
		case RECEIVE_VOTE_POST:
		case RECEIVE_DELETE_POST:
			const diff =  state.items.map((post) => {
				if(post.id === action.postId){
					return Object.assign({}, state.items[0], action.singlePost);
				}
				return post;
			});
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: diff,
				lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

export function singlePostDetails(state = {}, action){
	switch(action.type){
		case REQUEST_SINGLE_POST:
			return Object.assign({}, state, {
				postId: action.postId
			});
		case EDIT_POST:
		case ADD_POST:
		case RECEIVE_SINGLE_POST:
		case REQUEST_VOTE_POST:
		case DELETE_POST:
			return Object.assign({}, state, {
				singlePost: action.singlePost
			});
		case RECEIVE_VOTE_POST:
			return Object.assign({}, state, {
				singlePost: action.singlePost
			});
		default:
			return state
	}
}

export function postSortReducer(
	state = {sortOrder: 'timestamp', hideSortDropDown: false}, action){
	switch (action.type){
		case SET_SORTING:
			return {
				...state,
				sortOrder: action.sortOrder,
				hideSortDropDown: action.hideSortDropDown
			};
			default:
				return state;
	}
}
