import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Header from "./Header";
import Posts from "../posts/Posts";
import {  selectSubreddit,
	fetchPostsIfNeeded,
	invalidateSubreddit
} from "../posts/PostAction";

import {fetchCategoriesFirst} from "../categories/CategoryAction";

import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Categories from "../categories/CategoryContainer";

class App extends Component {
	state = {
		left: false,
	};

	/**
	 *
	 * @param open
	 */
	toggleDrawer = (open) => () => {
		this.props.dispatch(fetchCategoriesFirst());
		this.setState({
			left: open,
		});
	};

	componentDidMount(){
		const { dispatch, selectedSubreddit } = this.props;
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	render() {
		const {theme, classes, selectedSubreddit, posts, isFetching, lastUpdated, categories} = this.props;

		return (
			<div className='main'>
				<div className='header'>
					<Header
						toggleDrawer={this.toggleDrawer}
					/>
				</div>
				<Drawer open={this.state.left} onRequestClose={this.toggleDrawer(false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer( false)}
						onKeyDown={this.toggleDrawer(false)}
					>
						<div className='sidebarList'>
							<h3>Navigation</h3>
							<List>
								<ListItem button>
									<ListItemText primary="Home" />
								</ListItem>
							</List>
							<Divider/>
							<h3>Categories</h3>
							<Categories categories={categories}/>
						</div>
					</div>
				</Drawer>
				<div className='mainBody'>
					<main>
						{isFetching && posts.length === 0 && <h2>Loading...</h2>}
						{!isFetching && posts.length === 0 && <h2>Empty.</h2>}
						{posts.length > 0 &&
						<div style={{ opacity: isFetching ? 0.5 : 1 }}>
							<Posts posts={posts} />
						</div>}
					</main>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state) {
	const { selectedSubreddit, postsBySubreddit, allCategories } = state;
	const {
		isFetching,
		lastUpdated,
		items: posts
	} = postsBySubreddit[selectedSubreddit] || {
		isFetching: true,
		items: []
	};

const categories = allCategories.items;

	return {
		selectedSubreddit,
		posts,
		isFetching,
		lastUpdated,
		categories
	}
}


export default connect(
	mapStateToProps
)(App);
