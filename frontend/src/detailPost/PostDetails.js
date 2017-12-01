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
	};

	render() {
		const {item} = this.state;
		return (
			<div className='postDetail'>
				<h2>Post Details</h2>
				<div id="siteTable" className="sitetable linklisting">
					<div className="midcol unvoted">
						<div className="arrow up login-required access-required"
								 data-event-action="upvote" role="button" aria-label="upvote">
						</div>
						<div className="score dislikes" title="8092">8092</div>
						<div className="score unvoted" title="8093">8093</div>
						<div className="score likes" title="8094">8094</div>
						<div className="arrow down login-required access-required"
								 data-event-action="downvote"
								 role="button" aria-label="downvote">
						</div>
					</div>
					<a className="thumbnail invisible-when-pinned self may-blank loggedin "
						 data-event-action="thumbnail"
						 href="/r/Showerthoughts/comments/7gra6z/so_much_great_porn_goes_unwatched_due_to_poor/"
						 rel="">
					</a>
					<div className="entry unvoted RES-keyNav-activeElement">
						<div className="top-matter">
							<p className="title">
								<a className="title may-blank loggedin "
									 data-event-action="title"
									 rel="">
									So much great porn goes unwatched due to poor thumbnail choices
								</a>
								<span className="domain">(<a href="/r/Showerthoughts/">self.Showerthoughts</a>)</span>
							</p>
							<p className="tagline ">submitted
								<time title="Fri Dec 1 01:01:17 2017 UTC" dateTime="2017-12-01T01:01:17+00:00"
											className="live-timestamp">
									3 hours ago
								</time>
								by
								<a href="https://www.reddit.com/user/SoundByteHoe" className="author may-blank id-t2_fkk9y0z">SoundByteHoe</a>
								<span className="RESUserTag">
										<a className="userTagLink RESUserTagImage" title="set a tag" href="javascript:void 0">
										</a>
									</span>
								<a href="#" className="voteWeight">[vw]</a>
								<span className="userattrs"/></p>
							<ul className="flat-list buttons">
								<li className="first">
									<a
										href="https://www.reddit.com/r/Showerthoughts/comments/7gra6z/so_much_great_porn_goes_unwatched_due_to_poor/"
										data-inbound-url="/r/Showerthoughts/comments/7gra6z/so_much_great_porn_goes_unwatched_due_to_poor/?utm_content=comments&amp;utm_medium=front&amp;utm_source=reddit&amp;utm_name=Showerthoughts"
										data-href-url="/r/Showerthoughts/comments/7gra6z/so_much_great_porn_goes_unwatched_due_to_poor/"
										data-event-action="comments" className="bylink comments may-blank" rel="nofollow">311 comments
									</a>
								</li>
								<li className="viewSource">
									<a className="noCtrlF" href="javascript:void 0" data-text="source"/>
								</li>
								<li className="share">
									<a className="post-sharing-button" href="javascript: void 0;">share</a>
								</li>
								<li className="link-save-button save-button login-required">
									<a href="#">save</a></li>
							</ul>
						</div>
					</div>
				</div>
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
						data-limit="10000">
					</textarea>
				</div>
				<div className="usertext-buttons">
					<button type="submit" onClick="" className="save">save</button>
				</div>
			</div>
	)
	}

	}

	export default PostDetails