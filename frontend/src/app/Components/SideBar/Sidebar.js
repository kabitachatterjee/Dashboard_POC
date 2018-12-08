import React from 'react';
import {Drawer, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import Home from "@material-ui/icons/Home";

const Sidebar = (props) => {
  const {onToggleDrawer, left} = props;
  return (
    <Drawer open={left}
            onClose={onToggleDrawer(false)}>
      <div
        onClick={onToggleDrawer(false)}
        onKeyDown={onToggleDrawer(false)}
        role="button"
        tabIndex={0}
      >
        <div className='sidebarList'>
          <h3>Navigation</h3>
          <List>
            <NavLink className='navigationLinks' to="/">
            <ListItem button>
              <ListItemIcon>
                <Home/>
              </ListItemIcon>
              <ListItemText primary="Home"/>
            </ListItem>
          </NavLink>
          </List>
          <Divider/>
          <h3>Audiences</h3>
          <h3>Campaigns</h3>
          <h3>Product Sets</h3>
        </div>
      </div>
    </Drawer>
  )
};

export default Sidebar;
