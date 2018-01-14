import {
	REQUEST_COMMENTS,
	RECEIVE_COMMENTS, RECEIVE_SINGLE_COMMENTS, VOTE_COMMENT, RECEIVE_VOTE_COMMENT
} from './CommentAction';

export function allComments(state = {}, action){
	switch (action.type) {
		case REQUEST_COMMENTS:
		case RECEIVE_COMMENTS:
		case RECEIVE_SINGLE_COMMENTS:
		case RECEIVE_VOTE_COMMENT:
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
			let allCommentsWithNewVote = [];
			state.items.forEach((comment, index) => {
				if(comment.id === action.comment.id){
					state.items.splice(index, 1, action.comment);
					allCommentsWithNewVote = state;
				}
			});
			console.log(allCommentsWithNewVote);
			return Object.assign({}, state, {
				items: allCommentsWithNewVote
			});
		default:
			return state;
	}
}
