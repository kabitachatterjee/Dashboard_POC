import { GET_ALL_POSTS } from "./PostAction";

export default function(state=[], action){
	switch(action.type){
		case GET_ALL_POSTS:
			console.log(action.payload, "!!");
			return [action.payload, ...state];
		default:
			return state;
	}
}