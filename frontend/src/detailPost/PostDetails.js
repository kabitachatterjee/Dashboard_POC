import React, {Component} from 'react';
import PostContainer from "../posts/PostContainer";
import {FormControl} from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';


class PostDetails extends Component {
	state = {
		item: {
			"id": "8xf0y6ziyjabvozdd253nd",
			"timestamp": 1467166872634,
			"title": "Udacity is the best place to learn React",
			"body": "Everyone says so after all.",
			"author": "thingtwo",
			"category": "react",
			"voteScore": 6,
			"deleted": false,
			"commentCount": 2
		},
		comments: [],
		newComment: '',
	};

	postComment = () => {

	};

	render() {
		const {item} = this.state;
		return (
			<div className='postDetail'>
				<h2>Post Details</h2>
				<PostContainer key={item.id} post={item}/>
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
						value={this.state.newComment}
					>
					</textarea>
				</div>
				<div className="usertext-buttons">
					<button type="submit" onClick={this.postComment} className="save">save</button>
				</div>
			</div>
	)
	}

	}

	export default PostDetails