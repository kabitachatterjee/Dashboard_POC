import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, Toolbar, Typography, AppBar, Tooltip} from "@material-ui/core";
import NoteAdd from '@material-ui/icons/NoteAdd';
import {NavLink} from "react-router-dom";

const Header = (props) => {
  const {toggleDrawer} = props;
  return (
    <div className='header'>
      <AppBar>
        <Toolbar>
          <IconButton className='menuButton'
                      color="default"
                      aria-label="Menu"
                      onClick={toggleDrawer(true)}>
            <MenuIcon/>
          </IconButton>
          <Typography
            className="header-title"
            color="inherit"
            noWrap
            type="title">
            WMX 3.0
          </Typography>
          <NavLink to='/addPost'>
            <Tooltip id="tooltip-left-end"
                     title="Add Post"
                     placement="left-end">
              <IconButton color="default"
                          aria-label="Add Post">
                <NoteAdd/>
              </IconButton>
            </Tooltip>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default Header;
