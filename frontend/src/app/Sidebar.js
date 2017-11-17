import React, {Component} from 'react';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import {IconButton} from "material-ui";
import classNames from 'classnames';



class Sidebar extends Component {


	render(){
		const { classes, theme, sidebarStatus} = this.props;

		return(
		<div>
			<Drawer
				type="permanent"
				classes={{
					paper: classNames(classes.drawerPaper, ! sidebarStatus && classes.drawerPaperClose),
				}}
				open={ sidebarStatus}
			>
				<div className={classes.drawerInner}>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>BLAH</List>
					<List>BLAH</List>
					<Divider />
					<List>BLAH</List>

				</div>
			</Drawer>
		</div>
		)
	}
}

export default Sidebar;