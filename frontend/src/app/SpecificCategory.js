import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Posts from "../posts/Posts";
import {fetchPostsForCategory} from "../posts/PostAction";
import { selectCategory} from "../categories/CategoryAction";

class SpecificCategory extends Component {
	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(selectCategory(this.props.match.params.category));
		dispatch(fetchPostsForCategory(this.props.match.params.category));
	}



	render() {
		const { posts, isFetching} = this.props;
		return (
			<div>
				{isFetching && posts.length === 0 && <h2>Loading...</h2>}
				{!isFetching && posts.length === 0 && <h2>Empty.</h2>}
				{posts.length > 0 &&
				<div style={{opacity: isFetching ? 0.5 : 1}}>
					<Posts posts={posts}/>
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
		posts,
	};
}

export default connect(
	mapStateToProps, null, null, {pure: false}
)(SpecificCategory);
