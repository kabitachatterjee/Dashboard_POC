import React, {Component } from 'react';
import TextField from 'material-ui/TextField';
import {FormControl, Input, InputLabel, MenuItem, Select} from "material-ui";


class AddPost extends Component {
	state = {
		age: -1,
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};


	render(){
		return(
			<div>
				<TextField
					label="Title"
				/>
				<br/>
				<TextField
					label="Author"
				/>
				<br/>
				<TextField
					label="Body"
				/>
				<br/>
				<FormControl className='formControl'>
					<InputLabel htmlFor="category-simple">Category</InputLabel>
					<Select
						value={this.state.age}
						onChange={this.handleChange('age')}
						input={<Input id="category-simple" />}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={`Redux`}>React</MenuItem>
						<MenuItem value={`React`}>Redux</MenuItem>
						<MenuItem value={`React-redux`}>React-redux</MenuItem>
					</Select>
				</FormControl>
			</div>
		);
	}

}

export default AddPost;
