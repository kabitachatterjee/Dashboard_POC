import React from 'react';
import {Route, Switch} from "react-router-dom";
import AllPosts from "../Audience/Audiences/AudiencesContainer";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/Audience" component={AllPosts}/>
    </Switch>
  );
};

export default Routes;
