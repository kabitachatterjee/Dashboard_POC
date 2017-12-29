import React, {Component} from 'react';
import Posts from "../posts/Posts";
import {connect} from "react-redux";

class AllPosts extends Component {

//TODO(michaelhuy): Doesn't load categories on initial load
	componentWillMount() {
		const {dispatch, selectedSubreddit} = this.props;
		dispatch(fetchAllPosts());
	}

	render(){
		const { posts, isFetching} = this.props;

		return(
			<div>
				{isFetching && posts.length === 0 && <h2>Loading...</h2>}
				{!isFetching && posts.length === 0 && <h2>Empty.</h2>}
				{posts.length > 0 &&
				<div style={{ opacity: isFetching ? 0.5 : 1 }}>
					<Posts posts={posts} />
				</div>}
			</div>
		)
	}
}


function mapStateToProps(state) {
	const { postsByCategory} = state;
	const { isFetching, lastUpdated, items: posts } = postsByCategory[selectedCategory] ||
	{
		isFetching: true,
		items: []
	};
	return {
		posts,
		isFetching,
		lastUpdated,
	};
}

export default connect(mapStateToProps)(AllPosts);
