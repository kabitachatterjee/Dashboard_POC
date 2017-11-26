import React from 'react';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Upvote from 'material-ui-icons/KeyboardArrowUp';
import Downvote from 'material-ui-icons/KeyboardArrowDown';

import Avatar from 'material-ui/Avatar';



const PostContainer = (props) => {
	return(
	<div>
		<Card className='card'>
			<div className='cardHeader'>
				<div className='voteArea'>
					<div className='arrow-up'>
						<Upvote onClick={props.upVote}/>
					</div>
					<div className='totalscore'>
						{props.post.voteScore}
					</div>
					<div className='arrow-down'>
						<Downvote onClick={props.downVote}/>
					</div>
				</div>
				<CardHeader
					avatar={
						<Avatar className='avatar' aria-label="Recipe">
							R
						</Avatar>
					}
					title={props.post.author}
					subheader={props.post.timestamp}
				/>
			</div>
			<CardContent>
				<Typography type="headline" component="h2">
					{props.post.title}
				</Typography>
				<Typography component="p">
					{props.post.body}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton aria-label="Add to favorites">
					<FavoriteIcon />
				</IconButton>
				<Button dense color="primary">
					{props.post.commentCount} Comments
				</Button>
				<Button dense color="primary">
					Edit
				</Button>
				<Button dense color="primary">
					Share
				</Button>
				<Button dense color="primary">
				Delete
			</Button>

			</CardActions>
		</Card>
	</div>
)};

export default PostContainer;