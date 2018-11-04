import {
	REQUEST_COMMENTS,
	RECEIVE_COMMENTS, RECEIVE_SINGLE_COMMENTS, VOTE_COMMENT, RECEIVE_VOTE_COMMENT, EDIT_COMMENT, RECEIVE_DELETED_COMMENT
} from './CommentAction';

export function allComments(state = {}, action){
	switch (action.type) {
		case REQUEST_COMMENTS:
		case RECEIVE_COMMENTS:
		case RECEIVE_DELETED_COMMENT:
		case RECEIVE_SINGLE_COMMENTS:
		case RECEIVE_VOTE_COMMENT:
		case EDIT_COMMENT:
		case VOTE_COMMENT:
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
		case RECEIVE_VOTE_COMMENT:
			const allCommentsWithNewVote = state.items.map((comment) => {
				if(comment.id === action.comment.id){
					return Object.assign({}, comment, action.comment);
				}
				return comment;
			});
			return Object.assign({}, state, {
				items: allCommentsWithNewVote
			});
		case RECEIVE_DELETED_COMMENT:
			const nonDeletedItems = state.items.filter((comment) => {
				if(comment.id !== action.comments.id){
					return comment;
				}
			});
			return Object.assign({}, state, {
				items: nonDeletedItems
			});
		default:
			return state;
	}
}
