import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Header from "./Header";
import Posts from "../posts/Posts";
import { fetchPostsForCategory} from "../posts/PostAction";

import {fetchCategoriesFirst, selectCategory} from "../categories/CategoryAction";

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
		const { dispatch } = this.props;
		dispatch(selectCategory(this.props.match.params.category));
		dispatch(fetchPostsForCategory(this.props.match.params.category));
	}



	render() {
		const {theme, classes, selectedSubreddit, posts, isFetching, lastUpdated, categories} = this.props;
		console.log(this.props, "!!**")
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
	mapStateToProps
)(App);
