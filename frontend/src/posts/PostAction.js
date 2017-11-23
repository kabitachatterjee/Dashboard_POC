export const GET_ALL_POSTS = "GET_ALL_POSTS";

export function getAllPosts() {
	const url = `http://localhost:3001/posts`;
	let myHeaders = new Headers();
	myHeaders.append("Authorization", "whatever-you-want");

	const myInit = {
		method: 'GET',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default'
	};

	const request = fetch(url, myInit).then((response) => response.json())
		.then((data) => {
		console.log("DATA", data);
		return data;
	});

	return {
		type: GET_ALL_POSTS,
		payload: request,
	}
}

