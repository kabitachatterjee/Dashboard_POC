import fetch from 'cross-fetch';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_SINGLE_COMMENTS = 'RECEIVE_SINGLE_COMMENTS';
export const RECEIVE_VOTE_COMMENT = 'RECEIVE_VOTE_COMMENT';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const VOTE_COMMENT = 'VOTE_COMMENT';

function requestCategories(postId){
	return {
		type: REQUEST_COMMENTS,
		postId
	}
}

function receiveComments(json) {
	return {
		type: RECEIVE_COMMENTS,
		comments: json,
	}
}

function receiveWithNewComment(json) {
	return {
		type: RECEIVE_SINGLE_COMMENTS,
		comments: json,
	}
}

function createComment(comment){
	return {
		type: CREATE_COMMENT,
		comment,
	}
}

function upVoteComment(commentParam){
	return {
		type: VOTE_COMMENT,
		comment: commentParam
	}
}

function receiveWithUpdatedComment(updatedComment){
	return {
		type: RECEIVE_VOTE_COMMENT,
		comment: updatedComment,
	}
}

export function voteComment(voteParam){
	return dispatch => {
		dispatch(upVoteComment(voteParam));
		return fetch(`http://localhost:3001/comments/${voteParam.commentId}`, {
			headers: {
				'Authorization': 'whatever-you-want',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({"option": voteParam.vote})
		})
			.then(response => response.json())
			.then(json => dispatch(receiveWithUpdatedComment(json)))
	}
}

export function postNewComment(params){
	return dispatch => {
		dispatch(createComment(params));
		return fetch(`http://localhost:3001/comments`, {
			headers: {
				'Authorization': 'whatever-you-want',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(params)
		})
			.then(response => response.json())
			.then(json => dispatch(receiveWithNewComment(json)))
	}
}

export function fetchComments(postId){
	return dispatch => {
		dispatch(requestCategories(postId));
		return fetch(`http://localhost:3001/posts/${postId}/comments`, {
			headers: { 'Authorization': 'whatever-you-want'
			}
		})
			.then(response => response.json())
			.then(json => dispatch(receiveComments(json)))
	}
}
