import React, {Component} from 'react';
import PostContainer from "../posts/PostContainer";
import {FormControl} from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import Comment from "../comments/CommentsContainer";

class PostDetails extends Component {
	state = {
		body: '',
		parentId: '',
		author: 'michaelhuy@google.com',
	};

	handleCommentChange = (e) => {
		this.setState({body: e.target.value})
	};

	submitNewComment = () => {
		this.setState({
			parentId: this.props.singlePostDetails.singlePost.id
		});
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
					<h2>Post Details</h2>
					<PostContainer key={post.id} post={post}/>
					<div className='sortingComments'>
						<div className="menuarea">
							<div className="spacer">
								<FormControl className="formControl">
									<InputLabel htmlFor="sort">Sorted By:</InputLabel>
									<Select
										className='selectOptions'
										value='14'
										onChange={this.handleChange}
										input={<Input name="age" id="age-simple"/>}
									>
										<MenuItem value=""><em>None</em></MenuItem>
										<MenuItem value='best'>Best</MenuItem>
										<MenuItem value='top'>Top</MenuItem>
										<MenuItem value='newest'>Newest</MenuItem>
									</Select>
								</FormControl>
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
						{allComments.items && allComments.items.map((comment) => (
							comment.deleted && comment.parentDeleted ? '' : <Comment key={comment.id} comment={comment}/>
						))}
					</div>
				</div>
				}
			</div>
		)
	}
};

export default PostDetails;