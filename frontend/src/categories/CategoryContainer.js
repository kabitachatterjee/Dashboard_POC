import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';


class Categories extends Component {

	render() {
		const {categories} = this.props;
		console.log("CATEGORIES", categories)

		return (
			<div>
				<List>
				{this.props.categories && categories.map((item, i) => <ListItem key={i} primaryText={item.name}/>)}
				</List>
			</div>
		)
	}
}

export default Categories;
