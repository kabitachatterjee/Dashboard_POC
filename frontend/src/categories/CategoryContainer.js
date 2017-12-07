import React, {Component} from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import connect from "react-redux/es/connect/connect";
import {selectCategory} from "./CategoryAction";


class Categories extends Component {

	selectNewCategory = (event) => {
		this.props.dispatch(selectCategory(event.target.textContent));
	};

	render() {
		const {categories} = this.props;

		return (
			<div>
				<List>
				{this.props.categories && categories.map((item, i) => (
					<ListItem key={i} button>
						<ListItemText primary={item.name} value={item.name} onClick={this.selectNewCategory}/>
					</ListItem>
					)
				)}
				</List>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("STATE", state);
	return state;
}

export default connect(mapStateToProps)(Categories);
