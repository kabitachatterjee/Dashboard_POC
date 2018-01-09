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

	postComment = () => {

	};

	render(){
		const {allComments, singlePostDetails, categories} = this.props;
		return (
			<div>
				{Object.keys(allComments).length === 0 && Object.keys(singlePostDetails).length === 0 &&
				<div>Loading!!!</div>}
				{Object.keys(allComments).length > 0 && Object.keys(singlePostDetails).length > 0 &&
				<div>
					<Switch>
						<Route exact path="/:category/:postId"
									 render={()=><PostDetails allComments={allComments}
									 singlePostDetails={singlePostDetails}
									 postComment={this.postComment}/>}
						/>
						<Route exact path="/:category/:postId/edit"
									 render={()=><EditPost singlePostDetails={singlePostDetails} categories={categories}/>}
						/>
					</Switch>
				</div>
				}
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
