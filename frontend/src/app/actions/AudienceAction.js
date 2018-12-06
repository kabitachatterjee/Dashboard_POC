import fetch from 'cross-fetch';

export const REQUEST_AUDIENCES = 'REQUEST_AUDIENCES';
export const RECEIVE_AUDIENCES = 'RECEIVE_AUDIENCES';
export const DELETE_AUDIENCE = 'DELETE_AUDIENCE';
export const REQUEST_SINGLE_AUDIENCE = 'REQUEST_SINGLE_AUDIENCE';
export const RECEIVE_SINGLE_AUDIENCE = 'RECEIVE_SINGLE_AUDIENCE';
export const RECEIVE_DELETE_AUDIENCE = 'RECEIVE_DELETE_AUDIENCE';
export const EDIT_AUDIENCE = 'EDIT_AUDIENCE';
export const ADD_AUDIENCE = 'ADD_AUDIENCE';
export const SET_SORTING = 'SET_SORTING';

const standardHeaders = {
	'Authorization': 'whatever-you-want',
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

export function deleteAudience(post, category){
	return {
		type: DELETE_AUDIENCE,
		postId: post.id,
		singleAudience: post,
		category
	}
}

export function receiveDeleteAudience(post, category){
	return {
		type: RECEIVE_DELETE_AUDIENCE,
		postId: post.id,
		singleAudience: post,
		category
	}
}

export function editAudience(post, category){
	return {
		type: EDIT_AUDIENCE,
		postId: post.id,
		singleAudience: post,
		category
	}
}

export function addAudience(audienceDetails){
	return {
		type: ADD_AUDIENCE,
		audienceDetails,
	}
}

/**
 *
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
function requestAudiences(subreddit) {
	return {
		type: REQUEST_AUDIENCES,
		subreddit
	}
}

/**
 *
 * @param subreddit
 * @param json
 * @returns {{type: string, category: *, posts: *, receivedAt: number}}
 */
function receiveAudiences(category, json) {
	return {
		type: RECEIVE_AUDIENCES,
		category,
		posts: json,
		receivedAt: Date.now()
	}
}

function requestSingleAudience(postId){
	return {
		type: REQUEST_SINGLE_AUDIENCE,
		postId
	}
}

function receiveSingleAudience(postId, json){
	return {
		type: RECEIVE_SINGLE_AUDIENCE,
		postId,
		singleAudience: json,
	}
}

export function setAudienceSortOrder(sortOrder, boolean){
	return dispatch => {
		dispatch({
			type: SET_SORTING,
			sortOrder,
			hideSortDropDown: boolean,
		});
	}
}

/**
 * Fetch posts for a specific category.
 * @param subreddit
 * @returns {function(*)}
 */
export function fetchAudiencesForCategory(category) {
	return dispatch => {
		dispatch(requestAudiences(category));
		return fetch(`/${category}/posts`, {
			headers: standardHeaders})
			.then(response => response.json())
			.then(json => dispatch(receiveAudiences(category, json)))
	}
}

/**
 * Grab all posts.
 * @returns {function(*)}
 */
export function fetchAllAudiences() {
	return dispatch => {
		dispatch(requestAudiences());
		return fetch(`/posts`, {
			headers: standardHeaders
		})
			.then(response => response.json())
			.then(json => dispatch(receiveAudiences('all', json)))
	}
}

export function deleteSingleAudience(post, currentPage){
	return dispatch => {
		dispatch(deleteAudience(post, currentPage));
		return fetch(`posts/${post.id}`, {
			headers: standardHeaders,
			method: 'DELETE',
			} )
			.then(response => response.json())
			.then(json => dispatch(receiveDeleteAudience(json, currentPage)))
	}
}

export function fetchSingleAudience(postId){
	return dispatch => {
		dispatch(requestSingleAudience(postId));
		return fetch(`/posts/${postId}`, {
			headers: standardHeaders
		})
			.then(response => response.json())
			.then(json => dispatch(receiveSingleAudience(postId, json)))	}
}

export function patchSingleAudience(audienceDetails, category){
	return dispatch => {
		dispatch(editAudience(audienceDetails, category));
		return fetch(`/posts/${audienceDetails.id}`, {
			headers: standardHeaders,
			method: 'PUT',
			body: JSON.stringify({
				title: audienceDetails.title,
				body: audienceDetails.body
			})
		})
			.then(response =>  response.json())
			.then(json => dispatch(receiveVoteAudience(audienceDetails.id, json, category)))
	}
}

export function addNewAudience(audienceDetails){
	return dispatch => {
		dispatch(addAudience(audienceDetails));
		return fetch(`/posts/`, {
			headers: standardHeaders,
			method: 'POST',
			body: JSON.stringify(audienceDetails)
		})
			.then(response =>  response.json())
			.then(json => dispatch(receiveSingleAudience(audienceDetails.id, json)))
	}
}


