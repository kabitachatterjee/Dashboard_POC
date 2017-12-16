import React, {Component} from 'react';
import PostContainer from "../posts/PostContainer";
import {FormControl} from 'material-ui/Form';
import {MenuItem} from 'material-ui/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';


class PostDetails extends Component {
	state = {
		item: {},
		comments: [],
		newComment: '',
	};

	componentDidMount(){
		const postId = this.props.match.params.id;
		const postDetails = new Promise(resolve => {
				fetch(`http://localhost:3001/posts/${postId}`,
					{ headers: { 'Authorization': 'whatever-you-want'}});
			});

		const postComments = new Promise(resolve => {
				fetch(`http://localhost:3001/posts/${postId}/comments`,
					{headers: {'Authorization': 'whatever-you-want'}});
			});


		Promise.all([postDetails, postComments])
			.then((response) => {
				// return response[1].json()
				return response.map(item => {
					console.log(item);
					return item;
				})
			}).then((response) => response).then((now) => console.log(now))
	}

	/**
	 *
	 * @param postId
	 */
	loadData = (postId) => {
		const postDetails = fetch(`http://localhost:3001/posts/${postId}`, { headers: { 'Authorization': 'whatever-you-want'}});
		const postComments = fetch(`http://localhost:3001//posts/${postId}/comments`, { headers: { 'Authorization': 'whatever-you-want'}});

		Promise.all([postDetails, postComments])
			.then(function(results) {
				console.error(results.json());
			});
	}


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