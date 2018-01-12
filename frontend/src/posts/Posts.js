import React  from 'react';
import PostContainer from "./PostContainer";

const Posts = (props) => {
		return (
			<div>
			{props.posts.length === 0 &&
				<div>
					<p>Loading</p>
				</div>}
				{props.posts.length > 0
				&& props.posts.map(
					(item, index) => item.deleted ? '': <PostContainer key={index} post={item}/>)}
			</div>
		)
};

export default Posts;