import React, {Component} from 'react';
import PostContainer from "./PostContainer";


class Posts extends Component {




	render(){
		const {posts} = this.props;
		return (
			<div>
			{posts.length === 0 &&
				<div>
					<p>No Posts</p>
				</div>}
				{posts.length && 	posts.map((item) => item.deleted ? '': <PostContainer key={item.id} post={item} />)}
			</div>
		)
	}
}

export default Posts;