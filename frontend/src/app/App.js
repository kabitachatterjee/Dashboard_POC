import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Header from "./Header";
import Posts from "../posts/Posts";
import {getAllPosts} from "../posts/PostAction";


import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {bindActionCreators} from "redux";

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
		this.props.getAllPosts();

		console.log();

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


function mapStateToProps (dispatch) {
	return bindActionCreators({getAllPosts},(dispatch));
}

export default connect(
	null,
	mapStateToProps
)(App);