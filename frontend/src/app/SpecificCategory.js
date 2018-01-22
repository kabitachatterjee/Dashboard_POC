import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {fetchPostsForCategory, setPostSortOrder} from "../posts/PostAction";
import { selectCategory} from "../categories/CategoryAction";
import PostContainer from "../posts/PostContainer";

class SpecificCategory extends Component {
	componentWillMount() {
		this.initializeSpecificCategoryPage();
		this.props.dispatch(setPostSortOrder("timestamp", false));
	}

	/**
	 * Selects the category based off the current path, then finds the
	 * posts related to that category.
	 */
	initializeSpecificCategoryPage = () => {
		const {dispatch} = this.props;
		const correctPath = this.props.match.path.substr(1);
		dispatch(selectCategory(correctPath));
		dispatch(fetchPostsForCategory(correctPath));
	};

	/**
	 * Takes care of the switching between the category pages.
	 * @param nextProps
	 * @returns {*}
	 */
	componentWillReceiveProps(nextProps) {
		return nextProps;
	}

	/**
	 * Redirects the user back to the home page.
	 */
	redirectHome = () => {
		this.props.history.push(`/`);
	};

	render() {
		const { posts, isFetching} = this.props;
		return (
			<div>
				{isFetching && posts.length === 0 && <h2>Loading...</h2>}
				{!isFetching && posts.length === 0 && <h2>Empty.</h2>}
				{posts.length > 0 &&
				<div style={{opacity: isFetching ? 0.5 : 1}}>
					<PostContainer posts={posts} key={posts.id} comeHome={this.redirectHome}/>
				</div>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {selectedCategory, postsByCategory} = state;
	const {items: posts} = postsByCategory[selectedCategory] ||
	{
		isFetching: true,
		items: []
	};
	return {
		selectedCategory,
		posts,
	};
}

export default connect(mapStateToProps, null, null, {
	pure: false
})(SpecificCategory);
