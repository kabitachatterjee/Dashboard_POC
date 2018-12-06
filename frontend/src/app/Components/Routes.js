import React from 'react';
import {Route, Switch} from "react-router-dom";
import AllPosts from "../Audience/Audiences/AudiencesContainer";
import EditPost from "../../editPosts/EditPost";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={AllPosts}/>
      <Route path="/addPost"
             render={()=><EditPost {...props}
                                   action="Add"/>}
      />
    </Switch>
  );
};

export default Routes;
