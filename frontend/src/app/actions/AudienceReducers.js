import {
	REQUEST_AUDIENCES,
	RECEIVE_AUDIENCES,
	RECEIVE_SINGLE_AUDIENCE, REQUEST_SINGLE_AUDIENCE, EDIT_AUDIENCE, ADD_AUDIENCE, REQUEST_VOTE_AUDIENCE, RECEIVE_VOTE_AUDIENCE,
	RECEIVE_DELETE_AUDIENCE, DELETE_AUDIENCE, SET_SORTING
} from './AudienceAction'
import {SELECT_AUDIENCES} from "./AudiencesAction";

export function audiencesByCategory(state = {}, action) {
	switch (action.type) {
		case RECEIVE_AUDIENCES:
		case REQUEST_AUDIENCES:
		case EDIT_AUDIENCE:
		case RECEIVE_VOTE_AUDIENCE:
		case RECEIVE_DELETE_AUDIENCE:
		case SELECT_AUDIENCES:
			const defaultCategory = (!action.category) ? 'all' : action.category;
			return Object.assign({}, state, {
				[defaultCategory]: posts(state[action.category], action)
			});
		default:
			return state
	}
}

function audiences(
	state = {
		isFetching: false,
		didInvalidate: false,
		items: []
	},
	action
) {
	switch (action.type) {
		case REQUEST_AUDIENCES:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case RECEIVE_AUDIENCES:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.audiences,
				lastUpdated: action.receivedAt
			});
		case RECEIVE_VOTE_AUDIENCE:
		case RECEIVE_DELETE_AUDIENCE:
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
		case REQUEST_SINGLE_AUDIENCE:
			return Object.assign({}, state, {
				postId: action.postId
			});
		case EDIT_AUDIENCE:
		case ADD_AUDIENCE:
		case RECEIVE_SINGLE_AUDIENCE:
		case REQUEST_VOTE_AUDIENCE:
		case DELETE_AUDIENCE:
			return Object.assign({}, state, {
				singlePost: action.singlePost
			});
		case RECEIVE_VOTE_AUDIENCE:
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
