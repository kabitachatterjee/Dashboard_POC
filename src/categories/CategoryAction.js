import fetch from 'cross-fetch';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';


function requestCategories(){
	return {
		type: REQUEST_CATEGORIES,
	}
}

function receiveCategories(json){
	return {
		type: RECEIVE_CATEGORIES,
		categories: json,
	}
}

/**
 *
 * @param category
 * @returns {{type: string, category: *}}
 */
export function selectCategory(category) {
	return {
		type: SELECT_CATEGORY,
		category
	}
}

function fetchCategories(){
	return dispatch => {
		dispatch(requestCategories());
		return fetch(`window.location.origin/categories`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receiveCategories(json)))
	}
}

export function fetchCategoriesFirst(){
	return (dispatch) => {
		return dispatch(fetchCategories())
	}
}