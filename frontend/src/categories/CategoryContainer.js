import React from 'react';
import List, { ListItem } from 'material-ui/List';
import {Link, NavLink} from "react-router-dom";


const Categories = (props) => {
	const {categories} = props;
	return (
		<div>
			<List>
			{categories && categories.map((item, i) => (
				<ListItem key={i}>
					<NavLink className='navigationLinks' to={`/${item.name}`}> {item.name} </NavLink>
				</ListItem>
				)
			)}
			</List>
		</div>
	)
};

export default Categories;
