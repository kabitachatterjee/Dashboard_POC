import React, {Component } from 'react';
import PostContainer from "./PostContainer";

class PostDetails extends Component {
	state = {

	};

	render(){
		const { item } = this.state;
		return(
			<div>
				<div>Post Details</div>
				<PostContainer key={item.id} post={item} />
				<div>Comments</div>

			</div>
		)
	}
}

export default PostDetails