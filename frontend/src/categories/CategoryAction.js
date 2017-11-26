import fetch from 'cross-fetch';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function requestCategories(subreddit){
	return {
		type: REQUEST_CATEGORIES,
		subreddit
	}
}

function receiveCategories(json){
	return {
		type: RECEIVE_CATEGORIES,
		categories: json,
	}
}

function fetchCategories(){
	return dispatch => {
		dispatch(requestCategories());
		return fetch(`http://localhost:3001/categories`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receiveCategories(json)))
	}
}

export function fetchCategoriesFirst(){
	return (dispatch) => {
		return dispatch(fetchCategories())
	}
}