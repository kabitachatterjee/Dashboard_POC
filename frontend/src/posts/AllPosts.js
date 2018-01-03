import React, {Component} from 'react';
import Posts from "../posts/Posts";
import {connect} from "react-redux";
import {fetchAllPosts} from "./PostAction";
import {selectCategory} from "../categories/CategoryAction";

class AllPosts extends Component {

//TODO(michaelhuy): Doesn't load categories on initial load
	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(selectCategory('all'));
		dispatch(fetchAllPosts());
	}

	render(){
		const { items, isFetching} = this.props;

		return(
			<div>
				{isFetching && items.length === 0 && <h2>Loading...</h2>}
				{!isFetching && items.length === 0 && <h2>Empty.</h2>}
				{items.length > 0 &&
				<div style={{ opacity: isFetching ? 0.5 : 1 }}>
					<Posts posts={items} />
				</div>}
			</div>
		)
	}
}


function mapStateToProps(state) {
	const { postsByCategory, selectedCategory} = state;
	const { isFetching, lastUpdated, items } = postsByCategory[selectedCategory] ||
	{
		isFetching: true,
		items: []
	};
	return {
		items,
		isFetching,
		lastUpdated,
	};
}

export default connect(mapStateToProps)(AllPosts);
