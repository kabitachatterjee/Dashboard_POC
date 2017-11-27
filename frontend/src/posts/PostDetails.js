import React, {Component} from 'react';
import PostContainer from "./PostContainer";
import fetch from 'cross-fetch';

class PostDetails extends Component {
	state = {
		item: {
			"id": "8xf0y6ziyjabvozdd253nd",
			"timestamp": 1467166872634,
			"title": "Udacity is the best place to learn React",
			"body": "Everyone says so after all.",
			"author": "thingtwo",
			"category": "react",
			"voteScore": 6,
			"deleted": false,
			"commentCount": 2
		},
		comments: [],
	};


	render() {
		const {item} = this.state;
		return (
			<div>
				<div>Post Details</div>
				<PostContainer key={item.id} post={item}/>
				<div>Comments</div>
			</div>
		)
	}

}

export default PostDetails