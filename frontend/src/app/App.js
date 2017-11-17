import React, { Component } from 'react';
import './App.css';
import {connect} from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Posts from "../posts/Posts";
import {Typography} from "material-ui";
import { withStyles } from 'material-ui/styles';


const drawerWidth = 240;

const styles = theme => ({
	root: {
		width: '100%',
		height: 430,
		marginTop: theme.spacing.unit * 3,
		zIndex: 1,
		overflow: 'hidden',
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	appBar: {
		position: 'absolute',
		zIndex: theme.zIndex.navDrawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawerPaper: {
		position: 'relative',
		height: '100%',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		width: 60,
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	drawerInner: {
		// Make the items inside not wrap when transitioning:
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		width: '100%',
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: 24,
		height: 'calc(100% - 56px)',
		marginTop: 56,
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px)',
			marginTop: 64,
		},
	},
});

class App extends Component {
	state = {
		open: false,
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};



  render() {
    const {theme, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
      <div className="App">
        <Header
          handleDrawerClose={this.handleDrawerClose}
          sidebarStatus={this.state.open}
          classes={classes}
          theme={theme}
        />
        <Sidebar handleDrawerOpen={this.handleDrawerOpen}
                 classes={classes}
                 sidebarStatus={this.state.open}
                 theme={theme}
        />
        <main className={styles.content}>
          <Typography type="body1" noWrap>
						{'You think water moves fast? You should see ice.'}
            <Posts/>
          </Typography>
        </main>
      </div>
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
//
// function mapDispatchToProps (dispatch) {
// 	return {
// 		// selectRecipe: (data) => dispatch(addRecipe(data)),
// 	}
// }
//
// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(App)

export default withStyles(styles, { withTheme: true })(App);