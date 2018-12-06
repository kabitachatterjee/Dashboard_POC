import fetch from 'cross-fetch';

export const REQUEST_AUDIENCES = 'REQUEST_AUDIENCES';
export const RECEIVE_AUDIENCES = 'RECEIVE_AUDIENCES';
export const SELECT_AUDIENCES = 'SELECT_AUDIENCES';


function requestAudiences(){
	return {
		type: REQUEST_AUDIENCES,
	}
}

function receiveAudiences(json){
	return {
		type: RECEIVE_AUDIENCES,
		categories: json,
	}
}

/**
 *
 * @param audience
 * @returns {{type: string, audience: *}}
 */
export function selectAudience(audience) {
	return {
		type: SELECT_AUDIENCES,
		audience
	}
}

/**
 *
 * @returns {function(*): PromiseLike<T | never>}
 */
function fetchAudiences(){
	return dispatch => {
		dispatch(requestAudiences());
		return fetch(`http://localhost:3001/audiences`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receiveAudiences(json)))
	}
}

export function fetchAudiencesFirst(){
	return (dispatch) => {
		return dispatch(fetchAudiences())
	}
}
