import React from 'react';
import { Route, Switch} from "react-router-dom";
import SpecificCategory from "../app/SpecificCategory";
import PostSwitch from "../posts/PostSwitch";

const CategorySwitch = (props) => {
	const formattedCategories = props.categories ? props.categories.map((category) => `/${category.name}`) : '';

	return (
		<div>
			<Switch>
				{formattedCategories && formattedCategories.map(path => (
					<Route key={path} path={path} component={SpecificCategory} />
				))}
				<Route path="/:category/:postId" component={PostSwitch}/>
			</Switch>
		</div>
	)
};

export default CategorySwitch;
