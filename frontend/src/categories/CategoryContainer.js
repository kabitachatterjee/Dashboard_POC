import React, {Component} from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import connect from "react-redux/es/connect/connect";
import {selectCategory} from "./CategoryAction";
import {fetchPostsForCategory} from "../posts/PostAction";


class Categories extends Component {
	selectNewCategory = (event) => {
		const { dispatch, selectedCategory } = this.props;
		dispatch(selectCategory(event.target.textContent));
		dispatch(fetchPostsForCategory(event.target.textContent));
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
	const { selectedCategory, postsByCategory } = state;
	const { isFetching, lastUpdated, items: posts } = postsByCategory[selectedCategory] ||
	{
		isFetching: true,
		items: []
	};

	console.log(state, "!!")

	return {
		posts,
	};
}

export default connect(mapStateToProps)(Categories);
