import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import UUID from "uuid-js";
import {NavLink, Route, Switch} from "react-router-dom";
import {
	ListItemIcon, ListItemText, List, ListItem, Drawer, Divider, MenuItem, Input, Select,
	InputLabel, FormControl
} from "material-ui";
import {Home} from 'material-ui-icons';


import Header from "./Header";
import AllPosts from "../posts/AllPosts";
import Categories from "../categories/CategoryContainer";
import {fetchCategoriesFirst, selectCategory} from "../categories/CategoryAction";
import {addNewPost, fetchAllPosts, setPostSortOrder} from "../posts/PostAction";
import CategorySwitch from "../categories/CategorySwitch";
import EditPost from "../editPosts/EditPost";

class App extends Component {
	state = {
		left: false,
		sortOrder: 'timestamp',
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

	setSortOrder = (e) => {
		const sortOrder = e.target.value;
		this.setState({sortOrder});
		this.props.dispatch(setPostSortOrder(sortOrder, false));
	};

	/**
	 *
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
		const { categories, hideSortDropDown} = this.props;
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
						{!hideSortDropDown && <div className='sortRow'>
							<FormControl className="sortPosts" >
								<InputLabel htmlFor="sort-helper">Sort Posts</InputLabel>
								<Select
									value={this.state.sortOrder}
									onChange={this.setSortOrder}
									input={<Input name="Sort Post" id="sort-helper" />}
								>
									<MenuItem value='timestamp'>Newest</MenuItem>
									<MenuItem value='voteScore'>Highest Rated</MenuItem>
								</Select>
							</FormControl>
						</div>}
						<Switch>
							<Route exact path="/" component={AllPosts}/>
							<Route path="/addPost"
										 render={()=><EditPost categories={categories}
																					 submitChanges={this.submitNewPost}
																					 hideSortDropDown={this.hideSortDropDown}
																					 action="Add"/>}
							/>
							<Route path="/:category" component={CategorySwitch}/>
						</Switch>
					</main>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	const {selectedCategory, allCategories, postSortReducer} = state;
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
