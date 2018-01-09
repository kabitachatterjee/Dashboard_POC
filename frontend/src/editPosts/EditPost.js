import React, {Component} from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "material-ui";

class EditPost extends Component {
	state = {
		title: '',
		commentScore: 0,
		voteScore: 0,
		body: '',
		id: '',
		timestamp: '',
		author: '',
		deleted: false,
		category: 'react',
	};

	componentDidMount(){

	}

	handleChange = (e) => {
		console.log(e.target.id)
	};

	render(){
		const {categories, singlePostDetails} = this.props;
		return (
			<div>
				<div>
					<FormControl className='formControl'>
						<InputLabel htmlFor="title-helper">Title</InputLabel>
						<Input id="title"
									 value={this.state.title}
									 onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl className='formControl'>
						<InputLabel htmlFor="body-helper">Body</InputLabel>
						<Input id="body"
									 value={this.state.body}
									 onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl className='formControl'>
						<InputLabel htmlFor="author-helper">Author</InputLabel>
						<Input id="author" value={this.state.author} onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl className='formControl'>
						<InputLabel htmlFor="age-helper">Age</InputLabel>
						<Select
							id='category'
							value={this.state.category}
							onChange={this.handleChange}
							input={<Input name="category" id="category-helper" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{categories && categories.map((item, i) => (
									<MenuItem key={i} value={item.name}> {item.name} </MenuItem>
								)
							)}
						</Select>
					</FormControl>
					<br/>
				</div>
				<div>
					<Button raised color="primary">
						Primary
					</Button>
				</div>
			</div>
		);
	}
}

export default EditPost;
