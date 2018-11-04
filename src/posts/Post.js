import React, {Component}  from 'react';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import {Typography, Avatar, Button} from 'material-ui';

import {Link} from "react-router-dom";
import VoteComponent from "../app/voteComponent";

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
	 * Votes on the post according the button (up or down).
	 * @param {!Event} e
	 */
	vote = (e) => {
		this.props.votePostWithId(this.state.post, e.target.id);
	};

	/**
	 * Delete this specific post.
	 */
	deletePost = () => {
		this.props.deletePost(this.state.post);
	};

	render() {
		const {voteScore, author, timestamp, title, body, commentCount, id, category} = this.props.post;
		return (
			<div>
				<Card className='postDetails'>
					<div className='cardHeader'>
						<CardHeader
							avatar={
								<Avatar className='avatar' aria-label="Recipe">
									{author.substring(0,1)}
								</Avatar>
							}
							title={`Author: ${author}`}
							subheader={(new Date(timestamp)).toString()}
						/>
					</div>
					<CardContent className="postCardContent">
						<div className='postBody'>
							<VoteComponent
								voteComment={this.vote}
								voteScore={voteScore}
							/>
							<div className="postMeat">
								<Typography type="headline" component="h2">
									<Link to={`/${category}/${id}`} className='navigationLinks'>
										{title}</Link></Typography>
								<Typography component="p">{body}</Typography>
							</div>
						</div>
					</CardContent>
					<CardActions>
						<Link to={`/${category}`} className='navigationLinks'>
							<Button dense color="primary">
								Category: {category}
							</Button>
						</Link>
						<span>•</span>
						<Link to={`/${category}/${id}`} className='navigationLinks'>
							<Button dense color="primary">
								{commentCount} Comments
							</Button>
						</Link>
						<span>•</span>
						<Link to={`/${category}/${id}/edit`} className='navigationLinks'>
							<Button dense color="primary">
								Edit
							</Button>
						</Link>
						<span>•</span>
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
