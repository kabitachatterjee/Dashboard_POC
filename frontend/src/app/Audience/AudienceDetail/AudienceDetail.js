import React from 'react';
import AudienceDetailGraph from "./AudienceDetailGraph";
import AssociatedSubCampaigns from "./AssociatedSubCampaigns";
import StandAloneAudience from "./StandAloneAudience";

class AudienceDetail extends React.Component {

  render(){
    return (
      <div>
        <AudienceDetailGraph/>
        <AssociatedSubCampaigns/>
        <StandAloneAudience/>
      </div>
    )
  }
}

export default  AudienceDetail;
