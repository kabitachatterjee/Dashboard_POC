import fetch from 'cross-fetch';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_DELETED_COMMENT = 'RECEIVE_DELETED_COMMENT';
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

function receiveWithNonDeletedComment(json) {
	return {
		type: RECEIVE_DELETED_COMMENT,
		comments: json,
	}
}


function createComment(comment){
	return {
		type: CREATE_COMMENT,
		comment,
	}
}

function editSingleComment(comment){
	return {
		type: EDIT_COMMENT,
		comment
	}
}

function deleteSingleComment(id){
	return {
		type: DELETE_COMMENT,
		id,
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
		return fetch(`window.location.origin/comments/${voteParam.commentId}`, {
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
		return fetch(`window.location.origin/comments`, {
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

export function editCommentBody(params, id){
	return dispatch => {
		dispatch(editSingleComment(params));
		return fetch(`window.location.origin/comments/${id}`, {
			headers: {
				'Authorization': 'whatever-you-want',
				'Content-Type': 'application/json'
			},
			method: 'PUT',
			body: JSON.stringify(params)
		})
			.then(response => response.json())
			.then(json => dispatch(receiveWithUpdatedComment(json)))
	}
}

export function deleteComment(postId){
	return dispatch => {
		dispatch(deleteSingleComment(postId));
		return fetch(`window.location.origin/comments/${postId}`, {
			headers: { 'Authorization': 'whatever-you-want'},
			method: 'DELETE',
		})
			.then(response => response.json())
			.then(json => dispatch(receiveWithNonDeletedComment(json)))
	}
}

export function fetchComments(postId){
	return dispatch => {
		dispatch(requestCategories(postId));
		return fetch(`window.location.origin/posts/${postId}/comments`, {
			headers: { 'Authorization': 'whatever-you-want'
			}
		})
			.then(response => response.json())
			.then(json => dispatch(receiveComments(json)))
	}
}
