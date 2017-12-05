import fetch from 'cross-fetch';

export const CREATE_POST = 'CREATE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function createPost(postDetails){
	return {
		type: CREATE_POST,
		postDetails
	}
}

/**
 *
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
export function selectSubreddit(subreddit) {
	return {
		type: SELECT_SUBREDDIT,
		subreddit
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
 * @returns {{type: string, subreddit: *, posts: *, receivedAt: number}}
 */
function receivePosts(subreddit, json) {
	return {
		type: RECEIVE_POSTS,
		subreddit,
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
 *
 * @param subreddit
 * @returns {function(*)}
 */
export function fetchPosts(subreddit) {
	return dispatch => {
		dispatch(requestPosts(subreddit));
		return fetch(`http://localhost:3001/${subreddit}/posts`, {headers: { 'Authorization': 'whatever-you-want'}} )
			.then(response => response.json())
			.then(json => dispatch(receivePosts(subreddit, json)))
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




function fetchComments(postId) {
	return dispatch => {
		dispatch(requestComments(postId));
		return fetch(`localhost:3001/posts/${postId}/comments`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receiveComments(postId, json)))
	}
}


