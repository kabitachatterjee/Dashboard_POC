import React, {Component} from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';


class Categories extends Component {

	render() {
		const {categories} = this.props;

		return (
			<div>
				<List>
				{this.props.categories && categories.map((item, i) => (
					<ListItem key={i} button>
						<ListItemText primary={item.name}/>
					</ListItem>
					)
				)}
				</List>
			</div>
		)
	}
}

export default Categories;
