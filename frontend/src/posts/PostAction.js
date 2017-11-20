export const GET_ALL_POSTS = "GET_ALL_POSTS";


export function getAllPosts() {
	const url = `localhost:3001/posts`;
	const request = fetch(url);

	return {
		type: GET_ALL_POSTS,
		payload: request,
	}
}

