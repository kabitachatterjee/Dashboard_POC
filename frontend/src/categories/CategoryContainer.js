import React, {Component} from 'react';
import List from 'material-ui/List';


class Categories extends Component {

	render(){
		console.log("CATEGORIES", this.props)
		// const {categories} = this.props.categories;
		return (
			<div>
				{this.props.length === 0 &&
				<div>
					<p>No Posts</p>
				</div>}
			</div>
		)
	}
}

export default Categories;

// {/*{categories.length && 	categories.map((item, i) => <List>item</List>)}*/}
