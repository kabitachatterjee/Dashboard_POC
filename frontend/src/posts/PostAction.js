export const GET_ALL_POSTS = "GET_ALL_POSTS";

const fetchUrl = require("fetch").fetchUrl;

export function getAllPosts() {
	const url = `http://localhost:3001/posts`;
	const options = {
		headers:{
			"Authorization": "whatever-you-want",
		},
		credentials: 'same-origin'
	};
	const request = fetch(url, options);

	return {
		type: GET_ALL_POSTS,
		payload: request,
	}
}

