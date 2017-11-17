import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 3,
		width: '100%',
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
});

class Header extends Component {
	state = {
		anchorEl: null,
	};


	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleRequestClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
							<MenuIcon/>
						</IconButton>
						<Typography type="title" color="inherit" className={classes.flex}>
							Readit Application
						</Typography>
							<div>
								<IconButton
									aria-owns={open ? 'menu-appbar' : null}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="contrast"
								>
									<AccountCircle/>

								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onRequestClose={this.handleRequestClose}
								>
									<MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
									<MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
								</Menu>
							</div>
					</Toolbar>
				</AppBar>
			</div>
		)
	};
}


Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);