import React from 'react';
import {Route, Switch} from "react-router-dom";
import PostDetails from "../detailPost/PostDetails";
import SpecificCategory from "../app/SpecificCategory";

const CategorySwitch = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/:category" component={SpecificCategory}/>
				<Route path="/:category/:postId" component={PostDetails}/>
			</Switch>
		</div>
	)
};

export default CategorySwitch;
