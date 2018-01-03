import React  from 'react';
import PostContainer from "./PostContainer";

const Posts = (props) => {
		return (
			<div>
			{props.posts.length === 0 &&
				<div>
					<p>No Posts</p>
				</div>}
				{props.posts.length && props.posts.map((item) => item.deleted ? '': <PostContainer key={item.id} post={item} />)}
			</div>
		)
};

export default Posts;