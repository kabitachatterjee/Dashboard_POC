import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';



class Header extends React.Component {

	render() {
		const { classes, sidebarStatus } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classNames(classes.appBar, sidebarStatus && classes.appBarShift)}>
						<Toolbar disableGutters={!sidebarStatus}>
							<IconButton
								color="contrast"
								aria-label="open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, sidebarStatus && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
							<Typography type="title" color="inherit" noWrap>
								Mini variant drawer
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default Header;