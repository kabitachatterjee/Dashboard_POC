import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Header from "./Header";
import Posts from "../posts/Posts";
import {  selectSubreddit,
	fetchPostsIfNeeded,
	invalidateSubreddit
} from "../posts/PostAction";

import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

class App extends Component {
	state = {
		left: false,
	};

	toggleDrawer = (open) => () => {
		this.setState({
			left: open,
		});
	};

	componentDidMount(){
		const { dispatch, selectedSubreddit } = this.props;
		dispatch(fetchPostsIfNeeded(selectedSubreddit))
	}

	render() {
		const {theme, classes} = this.props;

		return (
			<div className='main'>
				<div className='header'>
					<Header toggleDrawer={this.toggleDrawer}/>
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
							<List>Test</List>
							<Divider/>
							<h3>Categories</h3>
							<List>Test</List>
						</div>
					</div>
				</Drawer>
				<div className='mainBody'>
					<main>
						<Posts/>
					</main>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state) {
	const { selectedSubreddit, postsBySubreddit } = state;
	const {
		isFetching,
		lastUpdated,
		items: posts
	} = postsBySubreddit[selectedSubreddit] || {
		isFetching: true,
		items: []
	};

	return {
		selectedSubreddit,
		posts,
		isFetching,
		lastUpdated
	}
}


export default connect(
	mapStateToProps
)(App);