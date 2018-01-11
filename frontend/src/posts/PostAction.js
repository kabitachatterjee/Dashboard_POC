import fetch from 'cross-fetch';

export const CREATE_POST = 'CREATE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const DELETE_POST = 'DELETE_POST';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';

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

export function editPost(postDetails){
	return {
		type: EDIT_POST,
		postDetails,
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

function upVotePost(post){
	return {
		type: UPVOTE_POST,
		postId: post.id,
		singlePost: post
	}
}

function downVotePost(post){
	return {
		type: DOWNVOTE_POST,
		postId: post.id,
		singlePost: post
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


export function upVoteForPostId(post){
	return dispatch => {
		dispatch(upVotePost(post));
		return fetch(`http://localhost:3001/posts/${post.id}`, {
			headers: { 'Authorization': 'whatever-you-want'},
			method: 'post',
			body: JSON.stringify({"option": "upVote"})
		})
			.then(response => response.json())
			.then(json => dispatch(receiveSinglePost(post.id, json)))
	}
}

export function downVoteForPostId(post){
	return dispatch => {
		dispatch(downVotePost(post));
		return fetch(`http://localhost:3001/posts/${post.id}`, {
			headers: { 'Authorization': 'whatever-you-want'},
			method: 'post',
			body: JSON.stringify({"option": "downVote"})
		})
			.then(response => response.json())
			.then(json => dispatch(receiveSinglePost(post.id, json)))
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


export function fetchSinglePost(postId){
	return dispatch => {
		dispatch(requestSinglePost(postId));
		return fetch(`http://localhost:3001/posts/${postId}`, {headers: { 'Authorization': 'whatever-you-want'}} )
			.then(response => response.json())
			.then(json => dispatch(receiveSinglePost(postId, json)))	}
}


export function patchSinglePost(postDetails){
	return dispatch => {
		dispatch(editPost(postDetails));
		return fetch(`http://localhost:3001/posts/${postDetails.id}`, {
			headers: { 'Authorization': 'whatever-you-want'},
			method: 'PUT',
			body: JSON.stringify({
				title: postDetails.title,
				body: postDetails.body
			})
		})
			.then(response =>  response.json())
			.then(json => dispatch(receiveSinglePost(postDetails.id, json)))
	}
}

export function addNewPost(postDetails){
	return dispatch => {
		dispatch(addPost(postDetails));
		return fetch(`http://localhost:3001/posts/`, {
			headers: { 'Authorization': 'whatever-you-want'},
			method: 'POST',
			body: JSON.stringify(postDetails)
		})
			.then(response =>  response.json())
			.then(json => dispatch(receiveSinglePost(postDetails.id, json)))
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

