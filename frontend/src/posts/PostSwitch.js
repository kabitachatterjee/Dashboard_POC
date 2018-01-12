import React, {Component} from 'react';
import {fetchComments, postNewComment} from "../comments/CommentAction";
import {fetchSinglePost, patchSinglePost} from "./PostAction";
import EditPost from "../editPosts/EditPost";
import PostDetails from "../detailPost/PostDetails";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import UUID from 'uuid-js';


class PostSwitch extends Component {
	componentDidMount() {
		const postId = this.props.match.params.postId;
		this.props.dispatch(fetchSinglePost(postId));
		this.props.dispatch(fetchComments(postId));
	}

	/**
	 *
	 *     POST /comments
	 USAGE:
	 Add a comment to a post

	 PARAMS:
	 id: Any unique ID. As with posts, UUID is probably the best here.
	 timestamp: timestamp. Get this however you want.
	 body: String
	 author: String
	 parentId: Should match a post id in the database.
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
		this.props.dispatch(postNewComment(params))
	};

	/**
	 * Makes put action creator ( PUT /posts/:id)
	 */
	submitChanges = (formObject) => {
		this.props.dispatch(patchSinglePost(formObject));
		this.props.history.push(`/category/${formObject.id}`);
	};

	render(){
		const {allComments, singlePostDetails, categories} = this.props;
		return (
			<div>
				<div>
					{Object.keys(allComments).length === 0
					&& Object.keys(singlePostDetails).length === 0
					&& categories &&
					<div>Loading!!!</div>}
					<Switch>

						{Object.keys(allComments).length > 0 && Object.keys(singlePostDetails).length > 0 &&
						<Route exact path="/:category/:postId"
									 render={()=><PostDetails allComments={allComments}
									 singlePostDetails={singlePostDetails}
									 postComment={this.postComment}/>}
						/>}
						{	categories && Object.keys(singlePostDetails).length > 0 &&
						<Route exact path="/:category/:postId/edit"
									 render={()=><EditPost singlePostDetails={singlePostDetails}
																				 categories={categories}
																				 submitChanges={this.submitChanges}
									 action="Edit"/>}
						/>}
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
