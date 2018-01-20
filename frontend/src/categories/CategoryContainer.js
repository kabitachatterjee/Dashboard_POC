import React from 'react';
import { NavLink} from "react-router-dom";
import {ListItemText, ListItem, List} from "material-ui";

const Categories = (props) => {
	const {categories} = props;
	return (
		<div>
			<List>
			{categories && categories.map((item, i) => (
				<NavLink key={i} className='navigationLinks' to={`/${item.name}`}>
					<ListItem button>
						<ListItemText primary={item.name} />
					</ListItem>
				</NavLink>
				)
			)}
			</List>
		</div>
	)
};

export default Categories;
