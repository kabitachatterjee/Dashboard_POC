import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';


class Categories extends Component {

	redirectCategory = (url) => {
		console.log(url, "!!!");
	};

	render() {
		const {categories} = this.props;
		return (
			<div>
				<List>
				{this.props.categories && categories.map((item, i) => (<ListItem key={i} onClick={this.redirectCategory(item.path)} >{item.name}</ListItem>))}
				</List>
			</div>
		)
	}
}

export default Categories;
