import React, {Component} from 'react';
import {FormControl, Input, InputLabel, MenuItem, Select, Typography} from "material-ui";

class SortPostContainer extends Component {
	state = {
		sortOrder: 'timestamp',
	};

	/**
	 * Calls the action creator based off the sort dropdown.
	 * @param {!Event} e
	 */
	setSortOrder = (e) => {
		const sortOrder = e.target.value;
		this.setState({sortOrder});
		this.props.passSortOrder(sortOrder);
	};

	render(){
		const {selectedCategory} = this.props;

		return(
			<div className='sortRow'>
				<Typography type="headline" component="h1">
					Category: {selectedCategory}
				</Typography>
				<FormControl className="sortPosts" >
					<InputLabel htmlFor="sort-helper">Sort Posts</InputLabel>
					<Select
						value={this.state.sortOrder}
						onChange={this.setSortOrder}
						input={<Input name="Sort Post" id="sort-helper" />}
					>
						<MenuItem value='timestamp'>Newest</MenuItem>
						<MenuItem value='voteScore'>Highest Rated</MenuItem>
					</Select>
				</FormControl>
			</div>
		)
	}

};

export default SortPostContainer;