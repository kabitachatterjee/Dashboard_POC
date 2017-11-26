import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES
} from './CategoryAction';


export function allCategories(state = {}, action){
	switch (action.type) {
		case REQUEST_CATEGORIES:
		case RECEIVE_CATEGORIES:
			return Object.assign({}, state, categories(state, action)
			);
		default:
			return state;
	}
}

function categories(state = {didInvalidate: false, items: []}, action) {
	switch (action.type) {
		case REQUEST_CATEGORIES:
			return Object.assign({}, state, {
				didInvalidate: false
			});
		case RECEIVE_CATEGORIES:
			return Object.assign({}, state, {
				didInvalidate: false,
				items: action.categories.categories
			});
		default:
			return state;
	}
}