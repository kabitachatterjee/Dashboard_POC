import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, TextField, Typography} from "material-ui";
import UpVote from 'material-ui-icons/KeyboardArrowUp';
import DownVote from 'material-ui-icons/KeyboardArrowDown';

class Comment extends Component {
	state = {
		inEditMode: false,
	};

	patchComment = () => {

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
							{!inEditMode && <Typography>Author: {comment.author}</Typography>}
							{inEditMode && <TextField label="author"/>}
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
							{inEditMode && <TextField label="body"/>}
						</div>
						<Typography>
							{readableDate}
						</Typography>
					</CardContent>
					<CardActions>
						{!inEditMode &&
						<Button dense color="primary" onClick={this.changeEditMode}>
							Edit
						</Button>}
						{inEditMode &&
						<Button dense color="primary" onClick={this.patchComment}>
							Save
						</Button>}
					</CardActions>
				</Card>
				<br></br>
			</div>
		)
	}
}

export default Comment;