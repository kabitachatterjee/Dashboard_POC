import React, {Component} from 'react';
import {deleteSinglePost, voteForPostId} from "./PostAction";
import {connect} from "react-redux";
import Post from "./Post";

class PostContainer extends Component {

	/**
	 *
	 * @param {{id: number}} postDetails
	 * @param {string} voteDirection
	 */
	voteForPost = (postDetails, voteDirection) => {
		this.props.dispatch(voteForPostId(postDetails, voteDirection, this.props.selectedCategory));
	};

	/**
	 *
	 */
	deletePost = (postDetails) => {
		this.props.dispatch(deleteSinglePost(postDetails, this.props.selectedCategory));
	};

	render() {
		return (
			<div>
				{this.props.posts.length === 0 &&
				<div>
					<p>Loading</p>
				</div>}
				{this.props.posts.length > 0
				&& this.props.posts.map(
					(item, index) => item.deleted ? '' :
						<Post key={index}
									votePost={this.voteForPost}
									deletePost={this.deletePost}
									post={item}/>)}
			</div>
		)
	}
}


function mapStateToProps(state) {
	return state;
}

export default connect(
	mapStateToProps,
)(PostContainer);
