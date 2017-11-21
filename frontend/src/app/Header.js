import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


class Header extends React.Component {

	render() {
		const { toggleDrawer } = this.props;

		return (
			<div>
				<div>
					<AppBar>
						<Toolbar>
							<IconButton className='menuButton'
													color="contrast"
													aria-label="Menu"
													onClick={toggleDrawer(true)}>
								<MenuIcon />
							</IconButton>
							<Typography type="title"
													color="inherit"
													noWrap>
								Readdit Redux
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	toggleDrawer: PropTypes.func.isRequired,
};

export default Header;