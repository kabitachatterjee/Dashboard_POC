import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchAllPosts, setPostSortOrder} from "./PostAction";
import {selectCategory} from "../categories/CategoryAction";
import PostContainer from "./PostContainer";

class AllPosts extends Component {

	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(selectCategory('all'));
		dispatch(fetchAllPosts());
		dispatch(setPostSortOrder("timestamp", false));
	}

	redirectHome = () => {
		this.props.history.push(`/`);
	};

	render(){
		const {items, isFetching} = this.props;

		return(
			<div>
				{isFetching && items.length === 0 && <h2>Loading...</h2>}
				{!isFetching && items.length === 0 && <h2>Empty.</h2>}
				{items.length > 0 &&
				<div style={{ opacity: isFetching ? 0.5 : 1 }}>
					<PostContainer posts={items} comeHome={this.redirectHome}/>
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
