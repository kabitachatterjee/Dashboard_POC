import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES, SELECT_CATEGORY,
} from './CategoryAction';

export function selectedCategory(state = 'all', action) {
	switch (action.type) {
		case SELECT_CATEGORY:
			return action.category;
		default:
			return state
	}
}

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

function categories(state = {items: []}, action) {
	switch (action.type) {
		case REQUEST_CATEGORIES:
			return Object.assign({}, state, {
			});
		case RECEIVE_CATEGORIES:
			return Object.assign({}, state, {
				items: action.categories.categories
			});
		default:
			return state;
	}
}