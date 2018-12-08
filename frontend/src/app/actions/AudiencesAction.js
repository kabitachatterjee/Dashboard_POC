import fetch from 'cross-fetch';
import {backEndUrl, standardHeaders} from './config';

export const REQUEST_AUDIENCES = 'REQUEST_AUDIENCES';
export const RECEIVE_AUDIENCES = 'RECEIVE_AUDIENCES';

function requestAudiences(){
  return {
		type: REQUEST_AUDIENCES,
	}
}

function receiveAudiences({audiences}){
	return {
    audiences,
    type: RECEIVE_AUDIENCES,
	}
}

/**
 *
 * @returns {function(*): PromiseLike<T | never>}
 */
export function fetchAllAudiences(){
	return dispatch => {
		dispatch(requestAudiences());
		return fetch(`${backEndUrl}/audiences`, {headers: standardHeaders})
			.then(response => response.json())
			.then(json => {
				return dispatch(receiveAudiences(json))
      })
	}
}

