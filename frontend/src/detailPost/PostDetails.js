import React, {Component} from 'react';
import PostContainer from "../posts/Post";
import Comment from "../comments/CommentsContainer";

class PostDetails extends Component {
	state = {
		body: '',
		parentId: '',
		author: 'michaelhuy@google.com',
	};

	handleCommentChange = (e) => {
		this.setState({body: e.target.value});
		this.setState({
			parentId: this.props.singlePostDetails.singlePost.id
		});
	};

	submitNewComment = () => {
		if(this.state.body){
			this.props.postComment(this.state);
		}
	};

	render() {
		if (!this.props.allComments || !this.props.singlePostDetails) {
			return (<div>LOADING!!</div>)
		}
		const {allComments, singlePostDetails} = this.props;
		const post = singlePostDetails.singlePost ? singlePostDetails.singlePost : '';
		return (
			<div className='postDetail'>
				{post && <div>
					<h1>Post Details</h1>
					<PostContainer key={post.id} post={post}/>
					<div className='sortingComments'>
						<div className="menuarea">
							<div className="spacer">
							</div>
						</div>
					</div>
					<div className="commentArea">
					<textarea
						className='commentArea_textbox'
						rows="1"
						cols="1"
						name="text"
						data-event-action="comment"
						data-limit="10000"
						onChange={this.handleCommentChange}
					>
					</textarea>
					</div>
					<div className="usertext-buttons">
						<button type="submit"
										onClick={this.submitNewComment}
										className="save">save</button>
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