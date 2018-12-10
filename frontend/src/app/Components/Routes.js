import React from 'react';
import { Route, Switch } from "react-router-dom";
import AudiencesContainer from "../Audience/Audiences/AudiencesContainer";
import AudienceDetail from "../Audience/AudienceDetail/AudienceDetail";

const Routes = () => {

  return (
    <Switch>
      <Route exact path="/Audience"
             component={AudiencesContainer}/>
      <Route path="/Audience/:id"
             component={AudienceDetail}/>
    </Switch>
  );
};

export default Routes;
