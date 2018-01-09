import React, {Component} from 'react';
import {fetchComments} from "../comments/CommentAction";
import {fetchSinglePost} from "./PostAction";
import EditPost from "../editPosts/EditPost";
import PostDetails from "../detailPost/PostDetails";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

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
	postComment = () => {

	};

	/**
	 * Makes put action creator ( PUT /posts/:id)
	 */
	submitChanges = () => {

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
