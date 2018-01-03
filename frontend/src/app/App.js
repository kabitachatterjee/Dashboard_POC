import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Header from "./Header";
import {fetchAllPosts} from "../posts/PostAction";
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Categories from "../categories/CategoryContainer";
import {Link, Route, Switch} from "react-router-dom";
import AllPosts from "../posts/AllPosts";
import {fetchCategoriesFirst} from "../categories/CategoryAction";
import CategorySwitch from "../categories/CategorySwitch";

class App extends Component {
	state = {
		left: false,
	};

	/**
	 *
	 * @param open
	 */
	toggleDrawer = (open) => () => {
		fetchAllPosts();
		this.setState({
			left: open,
		});
	};

	/**
	 * Changes the selected category to 'all' and fetches all
	 * the posts.
	 */
	componentDidMount() {
		this.props.dispatch(fetchCategoriesFirst());
	};

	render() {
		const {theme, classes, selectedSubreddit, categories} = this.props;
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
						onClick={this.toggleDrawer(false)}
						onKeyDown={this.toggleDrawer(false)}
					>
						<div className='sidebarList'>
							<h3>Navigation</h3>
							<List>
								<ListItem button>
									<Link to="/">Home</Link>
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
						<Switch>
							<Route exact path="/" component={AllPosts}/>
							<Route path="/:category" component={CategorySwitch}/>
						</Switch>
					</main>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	const {selectedCategory, allCategories} = state;
	const categories = allCategories.items;

	return {
		selectedCategory,
		categories
	}
}


export default connect(
	mapStateToProps
)(App);
