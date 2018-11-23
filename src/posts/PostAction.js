import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_VOTE_POST = 'REQUEST_VOTE_POST';
export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST';
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const SET_SORTING = 'SET_SORTING';

const standardHeaders = {
	'Authorization': 'whatever-you-want',
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

export function deletePost(post, category){
	return {
		type: DELETE_POST,
		postId: post.id,
		singlePost: post,
		category
	}
}

export function receiveDeletePost(post, category){
	return {
		type: RECEIVE_DELETE_POST,
		postId: post.id,
		singlePost: post,
		category
	}
}

export function editPost(post, category){
	return {
		type: EDIT_POST,
		postId: post.id,
		singlePost: post,
		category
	}
}

export function addPost(postDetails){
	return {
		type: ADD_POST,
		postDetails,
	}
}

/**
 *
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
function requestPosts(subreddit) {
	return {
		type: REQUEST_POSTS,
		subreddit
	}
}

/**
 *
 * @param subreddit
 * @param json
 * @returns {{type: string, category: *, posts: *, receivedAt: number}}
 */
function receivePosts(category, json) {
	return {
		type: RECEIVE_POSTS,
		category,
		posts: json,
		receivedAt: Date.now()
	}
}

function requestSinglePost(postId){
	return {
		type: REQUEST_SINGLE_POST,
		postId
	}
}

function receiveSinglePost(postId, json){
	return {
		type: RECEIVE_SINGLE_POST,
		postId,
		singlePost: json,
	}
}

function requestVotePost(post, category){
	return {
		type: REQUEST_VOTE_POST,
		postId: post.id,
		singlePost: post,
		category
	}
}

function receiveVotePost(postId, json, category){
	return {
		type: RECEIVE_VOTE_POST,
		postId,
		singlePost: json,
		category
	}
}

export function setPostSortOrder(sortOrder, boolean){
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
export function fetchPostsForCategory(category) {
	return dispatch => {
		dispatch(requestPosts(category));
		return fetch(`/${category}/posts`, {
			headers: standardHeaders})
			.then(response => response.json())
			.then(json => dispatch(receivePosts(category, json)))
	}
}


export function voteForPostId(post, voteDirection, category){
	return dispatch => {
		dispatch(requestVotePost(post, category));
		return fetch(`//posts/${post.id}`, {
			headers: standardHeaders,
			method: 'POST',
			body: JSON.stringify({option: voteDirection})
		})
			.then(response => response.json())
			.then(json => dispatch(receiveVotePost(post.id, json, category)))
	}
}

/**
 * Grab all posts.
 * @returns {function(*)}
 */
export function fetchAllPosts() {
	return dispatch => {
		dispatch(requestPosts());
		return fetch(`/posts`, {
			headers: standardHeaders
		})
			.then(response => response.json())
			.then(json => dispatch(receivePosts('all', json)))
	}
}

export function deleteSinglePost(post, currentPage){
	return dispatch => {
		dispatch(deletePost(post, currentPage));
		return fetch(`posts/${post.id}`, {
			headers: standardHeaders,
			method: 'DELETE',
			} )
			.then(response => response.json())
			.then(json => dispatch(receiveDeletePost(json, currentPage)))
	}
}


export function fetchSinglePost(postId){
	return dispatch => {
		dispatch(requestSinglePost(postId));
		return fetch(`/posts/${postId}`, {
			headers: standardHeaders
		})
			.then(response => response.json())
			.then(json => dispatch(receiveSinglePost(postId, json)))	}
}


export function patchSinglePost(postDetails, category){
	return dispatch => {
		dispatch(editPost(postDetails, category));
		return fetch(`/posts/${postDetails.id}`, {
			headers: standardHeaders,
			method: 'PUT',
			body: JSON.stringify({
				title: postDetails.title,
				body: postDetails.body
			})
		})
			.then(response =>  response.json())
			.then(json => dispatch(receiveVotePost(postDetails.id, json, category)))
	}
}

export function addNewPost(postDetails){
	return dispatch => {
		dispatch(addPost(postDetails));
		return fetch(`/posts/`, {
			headers: standardHeaders,
			method: 'POST',
			body: JSON.stringify(postDetails)
		})
			.then(response =>  response.json())
			.then(json => dispatch(receiveSinglePost(postDetails.id, json)))
	}
}


