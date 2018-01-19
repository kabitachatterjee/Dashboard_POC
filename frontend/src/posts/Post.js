import React, {Component}  from 'react';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import {Typography, Avatar, IconButton, Button} from 'material-ui';
import {Favorite} from 'material-ui-icons';

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
	 *
	 * @param e
	 */
	vote = (e) => {
		this.props.votePostWithId(this.state.post, e.target.id);
	};

	deletePost = () => {
		this.props.deletePost(this.state.post);
	};

	render() {
		console.log(this.props, "PROPS")
		const {voteScore, author, timestamp, title, body, commentCount, id} = this.props.post;
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
							title={author}
							subheader={timestamp}
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
									<Link to={`/category/${id}`} className='navigationLinks'>
										{title}</Link></Typography>
								<Typography component="p">{body}</Typography>
							</div>
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
