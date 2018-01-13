import {
	REQUEST_COMMENTS,
	RECEIVE_COMMENTS, RECEIVE_SINGLE_COMMENTS
} from './CommentAction';

export function allComments(state = {}, action){
	switch (action.type) {
		case REQUEST_COMMENTS:
		case RECEIVE_COMMENTS:
		case RECEIVE_SINGLE_COMMENTS:
			return Object.assign({}, state, comments(state, action)
			);
		default:
			return state;
	}
}

function comments(state = {items: []}, action) {
	switch (action.type) {
		case REQUEST_COMMENTS:
			return Object.assign({}, state, {});
		case RECEIVE_COMMENTS:
			return Object.assign({}, state, {
				items: action.comments
			});
		case RECEIVE_SINGLE_COMMENTS:
			const allComments = [...state.items, action.comments];
			return Object.assign({}, state, {
				items: allComments
			});
		default:
			return state;
	}
}
