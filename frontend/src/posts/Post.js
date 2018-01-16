import React, {Component}  from 'react';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import {Typography, Avatar, IconButton, Button} from 'material-ui';
import {Favorite, KeyboardArrowUp, KeyboardArrowDown} from 'material-ui-icons';

import {Link} from "react-router-dom";

class Post extends Component {
	state = {
		post: {},
	};

	componentDidMount(){
		this.setState({
			post: this.props.post,
		})
	}

	/**
	 *
	 * @param e
	 */
	vote = (e) => {
		this.props.votePost(this.state.post, e.target.id);
	};

	deletePost = () => {
		this.props.deletePost(this.state.post);
	};

	render() {
		const {voteScore, author, timestamp, title, body, commentCount, id} = this.props.post;
		return (
			<div>
				<Card className='card'>
					<div className='cardHeader'>
						<CardHeader
							avatar={
								<Avatar className='avatar' aria-label="Recipe">
									R
								</Avatar>
							}
							title={author}
							subheader={timestamp}
						/>
					</div>
					<CardContent>
						<div className='commentBody'>
							<div className='voteArea'>
								<div className='arrow-up'>
									<KeyboardArrowUp
										id='upVote'
										onClick={this.vote}
										className='voteCursor'/>
								</div>
								<div>
									{voteScore}
								</div>
								<div className='arrow-down'>
									<KeyboardArrowDown
										id='downVote'
										onClick={this.vote}
										className='voteCursor'/>
								</div>
							</div>
							<Typography type="headline" component="h2">
								<Link to={`/category/${id}`} className='navigationLinks'>
									{title}
								</Link>
							</Typography>
							<Typography component="p">
								{body}
							</Typography>
						</div>
					</CardContent>
					<CardActions>
						<IconButton aria-label="Add to favorites">
							<Favorite/>
						</IconButton>
						<Button dense color="primary">
							<Link to={`/category/${id}`} className='navigationLinks'>
								{commentCount} Comments
							</Link>
						</Button>
						<Button dense color="primary">
							<Link to={`/category/${id}/edit`} className='navigationLinks'>
								Edit
							</Link>
						</Button>
						<Button dense color="primary">
							Share
						</Button>
						<Button dense color="primary" onClick={this.deletePost}>
							Delete
						</Button>
					</CardActions>
				</Card>
			</div>
		)
	}
}

export default Post;
