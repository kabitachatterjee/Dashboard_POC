import React, {Component} from 'react';

class Comment extends Component {
 	render(){
 		const {comment} = this.props;
 		return (
 			<div>
				<div>Timestamp: {comment.timestamp}</div>
				<div>Author: {comment.author}</div>
				<div>Body: {comment.body}</div>
				<div>Vote score: {comment.voteScore}</div>
				<br></br>
			</div>
		)
	}
}

export default Comment;