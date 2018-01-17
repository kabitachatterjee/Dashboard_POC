import {
	INVALIDATE_SUBREDDIT,
	REQUEST_POSTS,
	RECEIVE_POSTS,
	RECEIVE_SINGLE_POST, REQUEST_SINGLE_POST, EDIT_POST, ADD_POST, REQUEST_VOTE_POST, RECEIVE_VOTE_POST,
	RECEIVE_DELETE_POST, DELETE_POST
} from './PostAction'

export function postsByCategory(state = {}, action) {
	switch (action.type) {
		case INVALIDATE_SUBREDDIT:
		case RECEIVE_POSTS:
		case REQUEST_POSTS:
		case EDIT_POST:
			return Object.assign({}, state, {
				[action.category]: posts(state[action.category], action)
			});
		case RECEIVE_VOTE_POST:
		case RECEIVE_DELETE_POST:
			let allPostsWithNewVote = [];
			state[action.category].items.forEach((post, index) => {
				if(post.id === action.postId){
					state[action.category].items.splice(index, 1, action.singlePost);
					allPostsWithNewVote = state;
				}
			});
			return Object.assign({}, state, {
				[action.category]: allPostsWithNewVote[action.category]
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

export function singlePostDetails(state = {}, action){
	switch(action.type){
		case REQUEST_SINGLE_POST:
			return Object.assign({}, state, {
				postId: action.postId
			});
		case EDIT_POST:
		case ADD_POST:
		case RECEIVE_SINGLE_POST:
		case REQUEST_VOTE_POST:
		case DELETE_POST:
			return Object.assign({}, state, {
				singlePost: action.singlePost
			});
		case RECEIVE_VOTE_POST:
			return Object.assign({}, state, {
				singlePost: action.singlePost
			});
		default:
			return state
	}
}

