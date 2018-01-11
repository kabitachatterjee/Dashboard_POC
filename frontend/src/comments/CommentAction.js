import fetch from 'cross-fetch';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';

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

function createComment(postId, comment){
	return {
		type: CREATE_COMMENT,
		comment,
	}
}

export function postNewComment(postId, params){
	return dispatch => {
		dispatch(createComment(postId, params));
		return fetch(`http://localhost:3001/posts/${postId}/comments`, {
			headers: { 'Authorization': 'whatever-you-want'},
			method: 'POST',
			body: JSON.stringify(params)
		})
			.then(response => response.json())
			.then(json => dispatch(receiveComments(json)))
	}
}

export function fetchComments(postId){
	return dispatch => {
		dispatch(requestCategories(postId));
		return fetch(`http://localhost:3001/posts/${postId}/comments`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receiveComments(json)))
	}
}
