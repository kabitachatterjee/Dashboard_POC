import React, {Component} from 'react';
import {deleteComment, editCommentBody, fetchComments, postNewComment, voteComment} from "../comments/CommentAction";
import {deleteSinglePost, fetchSinglePost, patchSinglePost, setPostSortOrder, voteForPostId} from "./PostAction";
import EditPost from "../editPosts/EditPost";
import PostDetails from "../detailPost/PostDetails";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import UUID from 'uuid-js';

class PostSwitch extends Component {
	componentDidMount() {
		const postId = this.props.match.params.postId;
		this.props.dispatch(fetchSinglePost(postId)).then((response) => {
			if(response.singlePost.error){
				this.props.history.push(`/404`);
			} else {
				this.props.dispatch(fetchComments(postId));
			}
		});
	}

	/**
	 * Posts a new comment to the backend.
	 * @param {{
	 * id: string,
	 * body: string,
	 * author: string
	 * parentId: number,
	 * }} commentObject
	 */
	postComment = (commentObject) => {
		const {body, author, parentId} = commentObject;
		const params = {
			id: UUID.create().hex,
			timestamp: + new Date(),
			body,
			author,
			parentId
		};
		this.props.dispatch(postNewComment(params));
		this.props.history.push(`/category/${parentId}`);
	};

	/**
	 * Params for API: timestamp, id, body
	 * @param commentParams
	 */
	editComment = (commentParams) => {
		const putParams = {
				timestamp: +new Date(),
				body: commentParams.commentBody
		};
		this.props.dispatch(editCommentBody(putParams, commentParams.commentId));
	};

	/**
	 * Delete a particular comment.
	 * @param {number} commentId
	 */
	deleteComment = (commentId) => {
		this.props.dispatch(deleteComment(commentId));
	};

	/**
	 * Makes PUT action creator for a particular post.
	 */
	submitChanges = (formObject) => {
		this.props.dispatch(patchSinglePost(formObject, this.props.selectedCategory));
		this.props.history.push(`/category/${formObject.id}`);
	};

	/**
	 * Vote on a particular comment.
	 * @param voteParams
	 */
	voteOnComment = (voteParams) => {
		this.props.dispatch(voteComment(voteParams));
	};

	/**
	 * Hides the sort drop down.
	 */
	hideSortDropDown = () => {
		this.props.dispatch(setPostSortOrder("timestamp", true));
	};

	/**
	 * Vote for a particular post.
	 * @param {{id: number}} postDetails
	 * @param {string} voteDirection
	 */
	voteForPost = (postDetails, voteDirection) => {
		this.props.dispatch(voteForPostId(postDetails, voteDirection, this.props.selectedCategory));
	};

	/**
	 * Delete this post and return the user to the home page.
	 * @param {{
	 * parentId: string,
   * timestamp: number,
   * body: string,
   * author: string,
   * voteScore: number,
   * deleted: boolean,
   * parentDeleted: boolean,
	 * }} postDetails
	 */
	deletePost = (postDetails) => {
		this.props.dispatch(deleteSinglePost(postDetails, this.props.selectedCategory));
		this.props.history.push(`/`);
	};

	render(){
		const {allComments, singlePostDetails, categories} = this.props;
		if(allComments.items){
			console.log(Object.keys(singlePostDetails.singlePost).length === 0)

		}
		return (
			<div>
				<div>
					{Object.keys(allComments).length === 0
					&& Object.keys(singlePostDetails).length === 0
					&& categories &&
					<div>Loading!!!</div>}
					<Switch>
						{Object.keys(allComments).length > 0 && Object.keys(singlePostDetails).length > 0 &&
							singlePostDetails.singlePost.deleted === false &&
						<Route exact path="/:category/:postId"
									 render={()=><PostDetails allComments={allComments}
									 singlePostDetails={singlePostDetails}
									 voteOnComment={this.voteOnComment}
									 deleteComment={this.deleteComment}
									 voteOnPost={this.voteForPost}
									 deleteOnPost={this.deletePost}
									 editComment={this.editComment}
									 hideSortDropDown={this.hideSortDropDown}
									 postComment={this.postComment}/>}
						/>}
						{	categories && Object.keys(singlePostDetails).length > 0 &&
						<Route exact path="/:category/:postId/edit"
									 render={()=><EditPost singlePostDetails={singlePostDetails}
																				 categories={categories}
																				 submitChanges={this.submitChanges}
																				 hideSortDropDown={this.hideSortDropDown}
									 action="Edit"/>}
						/>}
						{allComments.items &&
						Object.keys(singlePostDetails.singlePost).length === 0  &&
						<Redirect to="/404" />
						}
					</Switch>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {allComments, singlePostDetails, allCategories} = state;
	const categories = allCategories.items;
	return {
		allComments,
		singlePostDetails,
		categories
	};
}


export default connect(mapStateToProps)(PostSwitch);
