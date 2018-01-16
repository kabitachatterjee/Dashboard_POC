import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, TextField, Typography} from "material-ui";
import UpVote from 'material-ui-icons/KeyboardArrowUp';
import DownVote from 'material-ui-icons/KeyboardArrowDown';
import {Edit, Delete, Save} from 'material-ui-icons';

class Comment extends Component {
	state = {
		inEditMode: false,
		commentBody: '',
		commentId: 0,
	};

	componentDidMount() {
		this.setState({
			commentId: this.props.comment.id,
			commentBody: this.props.comment.body
		});
	}

	updateCommentBody = (e) => {
		this.setState({
			commentBody: e.target.value,
		});
	};

	patchComment = (e) => {
		this.changeEditMode();
		if(this.state.commentBody){
			this.props.editComment(this.state);
		}
	};

	removeComment = () => {
		this.props.deleteComment(this.state.commentId);
	};

	voteComment = (e) => {
		const voteParam = {
			commentId: this.props.comment.id,
			vote: e.target.id,
		};
		this.props.voteOnComment(voteParam);
	};

	changeEditMode = () => {
		const currentEditMode = this.state.inEditMode;
		this.setState({inEditMode: !currentEditMode});
	};

 	render(){
 		const {comment} = this.props;
 		const {inEditMode} = this.state;
 		const readableDate = (new Date(Number(comment.timestamp))).toString();
 		return (
 			<div>
				<Card >
					<CardContent>
						<div className="commentAuthor">
							<Typography>Author: {comment.author}</Typography>
						</div>
						<div className='voteArea'>
							<div className='arrow-up'>
								<UpVote onClick={this.voteComment}
												className='voteCursor'
												id='upVote'/>
							</div>
							<div>
								{comment.voteScore}
							</div>
							<div className='arrow-down'>
								<DownVote onClick={this.voteComment}
													className='voteCursor'
													id='downVote'/>
							</div>
						</div>
						<div className="commentBody">
							{!inEditMode && <Typography type="headline" component="h2">
								{comment.body}</Typography>}
							{inEditMode && <TextField
								label="Comment Body"
								onChange={this.updateCommentBody}
								value={this.state.commentBody}
							/>}
						</div>
						<Typography>
							{readableDate}
						</Typography>
					</CardContent>
					<CardActions>
						{!inEditMode &&
						<Button dense color="primary" onClick={this.changeEditMode}>
							<Edit />
						</Button>}
						{inEditMode &&
						<Button dense color="primary" onClick={this.patchComment}>
							<Save />
						</Button>}
						<Button dense color="primary" onClick={this.removeComment}>
							<Delete />
						</Button>
					</CardActions>
				</Card>
				<br></br>
			</div>
		)
	}
}

export default Comment;