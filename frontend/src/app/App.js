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
import {addNewPost, fetchAllPosts} from "../posts/PostAction";
import CategorySwitch from "../categories/CategorySwitch";
import EditPost from "../editPosts/EditPost";

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
	 * Changes the selected category to 'all' and fetches all
	 * the posts.
	 */
	componentDidMount() {
		this.props.dispatch(fetchCategoriesFirst());
	};

	render() {
		const { categories} = this.props;
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
						<Switch>
							<Route exact path="/" component={AllPosts}/>
							<Route path="/addPost"
										 render={()=><EditPost categories={categories}
																					 submitChanges={this.submitNewPost}
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
