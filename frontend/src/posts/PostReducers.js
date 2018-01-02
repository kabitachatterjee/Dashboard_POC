import {
	INVALIDATE_SUBREDDIT,
	REQUEST_POSTS,
	RECEIVE_POSTS,
	REQUEST_COMMENTS,
	RECEIVE_COMMENTS,
	UPVOTE_POST,
	DOWNVOTE_POST, RECEIVE_SINGLE_POST, REQUEST_SINGLE_POST
} from './PostAction'

// Changes the vote count in the post?
export function votesByPostId(state={}, action){
	console.error("Inside");
	switch (action.type) {
		case UPVOTE_POST:
			// Change the vote count
			return Object.assign({}, state, {
				[action.category]: posts(state[action.category], action)
			});
		case DOWNVOTE_POST:
			return Object.assign({}, state, {
				[action.category]: posts(state[action.category], action)
			});
		default:
			return state;
	}
}

export function postsByCategory(state = {}, action) {
	switch (action.type) {
		case INVALIDATE_SUBREDDIT:
		case RECEIVE_POSTS:
		case REQUEST_POSTS:
			return Object.assign({}, state, {
				[action.category]: posts(state[action.category], action)
			});
		default:
			return state
	}
}

function posts(
	state = {
		isFetching: false,
		didInvalidate: false,
		items: []
	},
	action
) {
	switch (action.type) {
		case INVALIDATE_SUBREDDIT:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case REQUEST_POSTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case RECEIVE_POSTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.posts,
				lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

export function commentsByPostId(state = {}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS:
		case REQUEST_COMMENTS:
			return Object.assign({}, state, {
				[action.subreddit]: posts(state[action.subreddit], action)
			});
		default:
			return state
	}
}

function comments(
	state = {
		comments: []
	},
	action
) {
	switch (action.type) {
		case REQUEST_COMMENTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case RECEIVE_COMMENTS:
			return Object.assign({}, state, {
				comments: action.comments,
			});
		default:
			return state
	}
}


export function singlePostDetails(state = {}, action){
	switch(action.type){
		case REQUEST_SINGLE_POST:
			return Object.assign({}, state, {
				postId: action.postId
			});
		case RECEIVE_SINGLE_POST:
			return Object.assign({}, state, {
				singlePost: action.singlePost
			});
		default:
			return state
	}
}