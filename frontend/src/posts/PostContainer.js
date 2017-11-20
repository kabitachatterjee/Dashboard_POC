import React from 'react';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Avatar from 'material-ui/Avatar';


const PostContainer = () => (

	<div>

		<Card className='card'>
			<CardHeader
				avatar={
					<Avatar className='avatar' aria-label="Recipe">
						R
					</Avatar>
				}
				title="Author"
				subheader="September 14, 2016"
			/>
			<CardContent>
				<Typography type="headline" component="h2">
					Post Title
				</Typography>
				<Typography component="p">
					Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
					across all continents except Antarctica
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton aria-label="Add to favorites">
					<FavoriteIcon />
				</IconButton>
				<Button dense color="primary">
					Comments
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
);

export default PostContainer;