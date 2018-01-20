import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {fetchPostsForCategory, setPostSortOrder} from "../posts/PostAction";
import { selectCategory} from "../categories/CategoryAction";
import PostContainer from "../posts/PostContainer";
import {withRouter} from "react-router-dom";

class SpecificCategory extends Component {
	componentWillMount() {
		this.initializeSpecificCategoryPage();
		this.props.dispatch(setPostSortOrder("timestamp", false));
		console.log(this.props.match.params.category, "PROPS")
	}
	//
	// shouldComponentUpdate(this.props.selectedCategory, this.props.match.params.category) {
	// 	// if (this.props.selectedCategory !== this.props.match.params.category) {
	// 	// 	this.initializeSpecificCategoryPage();
	// 	// }
	// }

	initializeSpecificCategoryPage = () => {
		const {dispatch} = this.props;
		dispatch(selectCategory(this.props.match.params.category));
		dispatch(fetchPostsForCategory(this.props.match.params.category));
	};

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

export default connect(
	mapStateToProps,
)(SpecificCategory);
