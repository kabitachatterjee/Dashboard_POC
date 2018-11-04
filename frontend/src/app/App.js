import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import UUID from "uuid-js";
import {NavLink, Route, Switch} from "react-router-dom";
import {ListItemIcon, ListItemText, List, ListItem, Drawer, Divider} from "material-ui";
import {Home} from 'material-ui-icons';

import Header from "./Header";
import AllPosts from "../posts/AllPosts";
import Categories from "../categories/CategoryContainer";
import {fetchCategoriesFirst} from "../categories/CategoryAction";
import {addNewPost, fetchAllPosts, setPostSortOrder} from "../posts/PostAction";
import CategorySwitch from "../categories/CategorySwitch";
import EditPost from "../editPosts/EditPost";
import SortPostContainer from "./SortPostContainer";

class App extends Component {
	state = {
		left: false,
	};

	/**
	 * Opens sidebar drawer.
	 * @param {boolean} open
	 */
	toggleDrawer = (open) => () => {
		fetchAllPosts();
		this.setState({
			left: open,
		});
	};

	/**
	 * Submits the post details necessary for creating a new post.
	 * @param {{
	 * title: string,
   * id: number,
   * author: string,
   * category: string,
	 * }} postDetails
	 */
	submitNewPost = (postDetails) => {
		const {title, body, author, category} = postDetails;
		const params = {
			title, body, author, category,
			id: UUID.create().hex,
			timestamp: + new Date(),
		};
		this.props.dispatch(addNewPost(params));
		this.props.history.push(`/`);
	};

	/**
	 * Gets value from SortPostContainer.
	 * @param {string} sortOrder
	 */
	passSortOrder = (sortOrder) => {
		this.props.dispatch(setPostSortOrder(sortOrder, false));
	};

	/**
	 * Hides the post sort drop on non-applicable pages.
	 */
	hideSortDropDown = () => {
		this.props.dispatch(setPostSortOrder("timestamp", true));
	};

	/**
	 * Changes the selected category to 'all' and fetches all
	 * the posts.
	 */
	componentDidMount() {
		this.props.dispatch(fetchCategoriesFirst());
	};

	render() {
		const { categories, hideSortDropDown, selectedCategory} = this.props;
		return (
			<div className='main'>
				<div className='header'>
					<Header
						toggleDrawer={this.toggleDrawer}
					/>
				</div>
				<Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer(false)}
						onKeyDown={this.toggleDrawer(false)}
					>
						<div className='sidebarList'>
							<h3>Navigation</h3>
							<List>
								<NavLink className='navigationLinks' to="/">
									<ListItem button>
										<ListItemIcon>
											<Home/>
										</ListItemIcon>
										<ListItemText primary="Home"/>
									</ListItem>
								</NavLink>
							</List>
							<Divider/>
							<h3>Categories</h3>
							<Categories categories={categories}/>
						</div>
					</div>
				</Drawer>
				<div className='mainBody'>
					<main>
						{!hideSortDropDown && <SortPostContainer passSortOrder={this.passSortOrder}/>}
						<Switch>
							<Route exact path="/" component={AllPosts}/>
							<Route path="/addPost"
										 render={()=><EditPost categories={categories}
																					 submitChanges={this.submitNewPost}
																					 hideSortDropDown={this.hideSortDropDown}
																					 action="Add"/>}
							/>
							<Route path="/:category"
										 render={()=><CategorySwitch categories={categories}/>}/>
						</Switch>
					</main>
				</div>
			</div>
		);
	}
}


function mapStateToProps({selectedCategory, allCategories, postSortReducer}) {
	const categories = allCategories.items;
	const hideSortDropDown = postSortReducer.hideSortDropDown;
	return {
		selectedCategory,
		categories,
		hideSortDropDown
	}
}


export default connect(
	mapStateToProps
)(App);
