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
		this.props.comeHome();
	};

	render() {
		return (
			<div>
				{this.props.posts.length === 0 && <div><p>Loading</p></div>}
				{this.props.posts.length > 0 && this.props.posts
					.sort((a, b) => b[this.props.sortOrder] - a[this.props.sortOrder])
					.map((item) => item.deleted ?
						"" :
						<Post key={item.id}
									deletePost={this.deletePost}
									post={item}
									votePostWithId={this.voteForPost}/>)
				}
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		sortOrder: state.postSortReducer.sortOrder,
		selectedCategory: state.selectedCategory
	};
}

export default connect(
	mapStateToProps,
)(PostContainer);
