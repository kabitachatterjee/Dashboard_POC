import fetch from 'cross-fetch';

export const CREATE_POST = 'CREATE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const DELETE_POST = 'DELETE_POST';

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function createPost(postDetails){
	return {
		type: CREATE_POST,
		postDetails
	}
}

export function deletePost(postId){
	return {
		type: DELETE_POST,
		postId
	}
}

/**
 *
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
export function invalidateSubreddit(subreddit) {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit
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

function requestComments(postId){
	return {
		type: REQUEST_COMMENTS,
		postId
	}
}

function receiveComments(postId, json){
	return {
		type: RECEIVE_COMMENTS,
		postId,
		comments: json
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
		return fetch(`http://localhost:3001/${category}/posts`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receivePosts(category, json)))
	}
}


/**
 *
 * @param subreddit
 * @returns {function(*)}
 */
export function fetchAllPosts() {
	return dispatch => {
		dispatch(requestPosts());
		return fetch(`http://localhost:3001/posts`, {headers: { 'Authorization': 'whatever-you-want'}} )
			.then(response => response.json())
			.then(json => dispatch(receivePosts('all', json)))
	}
}

export function deletePostAction(postId){
	return dispatch => {
		dispatch(deletePost(postId));
		return fetch(`http://localhost:3001/posts/${postId}`, {headers: { 'Authorization': 'whatever-you-want'}} )
			.then(response => response.json())
			//TODO(michaelhuy): receivePosts of last category, so "selectedCategory"??
			.then(json => dispatch(receivePosts('all', json)))
	}
}


function fetchComments(postId) {
	return dispatch => {
		dispatch(requestComments(postId));
		return fetch(`localhost:3001/posts/${postId}/comments`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receiveComments(postId, json)))
	}
}

