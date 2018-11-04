import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'material-ui-icons/Menu';
import {IconButton, Toolbar, Typography, AppBar, Tooltip} from "material-ui";
import NoteAdd from 'material-ui-icons/NoteAdd';
import {NavLink} from "react-router-dom";


class Header extends React.Component {


	render() {
		const { toggleDrawer } = this.props;
		return (
			<div>
				<div>
					<AppBar>
						<Toolbar>
							<IconButton className='menuButton'
													color="default"
													aria-label="Menu"
													onClick={toggleDrawer(true)}>
								<MenuIcon />
							</IconButton>
							<Typography type="title"
													color="inherit"
													className="header-title"
													noWrap>
								Readdit Redux
							</Typography>
							<NavLink to='/addPost'>
								<Tooltip id="tooltip-left-end"
												 title="Add Post"
												 placement="left-end">
									<IconButton  color="default"
															 aria-label="Add Post">
										<NoteAdd/>
									</IconButton>
								</Tooltip>
							</NavLink>
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