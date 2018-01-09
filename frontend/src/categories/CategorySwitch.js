import React from 'react';
import {Route, Switch} from "react-router-dom";
import SpecificCategory from "../app/SpecificCategory";
import PostSwitch from "../posts/PostSwitch";

const CategorySwitch = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/:category" component={SpecificCategory}/>
				<Route path="/:category/:postId" component={PostSwitch}/>
			</Switch>
		</div>
	)
};

export default CategorySwitch;
