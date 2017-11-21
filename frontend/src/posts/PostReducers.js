import { GET_ALL_POSTS } from "./PostAction";

export default function(state=[], action){
	switch(action.type){
		case GET_ALL_POSTS:
			return [action.payload.data, ...state];
		default:
			return state;
	}
}