import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Header from "./Header";
import Posts from "../posts/Posts";
import {Typography} from "material-ui";


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


// function mapStateToProps () {
//
// 	return {
// 		// calendar: dayOrder.map((day) => ({
// 		// 	day,
// 		// 	meals: Object.keys(calendar[day]).reduce((meals, meal) => {
// 		// 		meals[meal] = calendar[day][meal]
// 		// 			? food[calendar[day][meal]]
// 		// 			: null;
// 		//
// 		// 		return meals
// 		// 	}, {})
// 		// })),
// 	}
// }

function mapStateToProps (posts) {
	return {
		posts,
	}
}

export default connect(
	mapStateToProps,
	// mapDispatchToProps
)(App);