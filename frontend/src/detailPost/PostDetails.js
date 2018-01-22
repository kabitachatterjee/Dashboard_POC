import React, {Component} from 'react';
import Post from "../posts/Post";
import Comment from "../comments/CommentsContainer";
import {Button, TextField} from "material-ui";

class PostDetails extends Component {
	state = {
		body: '',
		parentId: '',
		author: 'michaelhuy@google.com',
	};

	/**
	 * Whenever there is a change in the comment box, it is passes to the debounce function.
	 * @param {!Event} e
	 */
	handleCommentChange = (e) => {
		if(e.target.value){
			this.setState({body: e.target.value});
		}
	};

	componentDidMount(){
	//	trigger hiding of the sorting drop down
		this.props.hideSortDropDown();
		this.setState({
			parentId: this.props.singlePostDetails.singlePost.id
		});
	}

	/**
	 * If there is a comment value, it is sends that comment to the backend.
	 * Resets the comment value.
	 */
	submitNewComment = () => {
		if(this.state.body){
			this.props.postComment(this.state);
		}
		this.setState({body: "Another Comment?"});
	};


	render() {
		if (!this.props.allComments || !this.props.singlePostDetails) {
			return (<div>LOADING!!</div>)
		}
		const {allComments, singlePostDetails, deleteOnPost, voteOnPost} = this.props;
		const post = singlePostDetails.singlePost ? singlePostDetails.singlePost : '';
		return (
			<div className='postDetail'>
				{post && <div>
					<h1>Post Details</h1>
					<Post key={post.id}
								post={post}
								deletePost={deleteOnPost}
								votePostWithId={voteOnPost}/>
					<div className="commentArea">
						<TextField
							id="multiline-static"
							label="New Comment"
							multiline
							rows="4"
							placeholder="Enter a new comment here..."
							className='commentArea_textbox'
							margin="normal"
							value={this.state.body}
							onChange={this.handleCommentChange}
						/>
					</div>
					<div className="usertext-buttons">
						<Button raised
										color="primary"
										onClick={this.submitNewComment}
										className='submitCommentButton'>
							Save
						</Button>
					</div>
					<div>
						<h1>Comments</h1>
						{allComments.items.length > 0 && allComments.items.map((comment) => (
							comment.deleted && comment.parentDeleted ? '' :
								<Comment key={comment.id}
												 comment={comment}
												 voteOnComment={this.props.voteOnComment}
												 deleteComment={this.props.deleteComment}
												 editComment={this.props.editComment}
								/>
						))}
					</div>
				</div>
				}
			</div>
		)
	}
}

export default PostDetails;