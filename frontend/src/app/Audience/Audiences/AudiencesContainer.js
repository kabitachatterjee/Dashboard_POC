import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchAllAudiences} from "../../actions/AudiencesAction";
import AudienceRow from "./AudienceRow";
import {Link} from "react-router-dom";

class AudiencesContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchAllAudiences());
  }

  /**
   * On click event, it routes to the audience detail page.
   * @param {{url: string}} match
   * @param {!AudienceTableRow} rowInfo
   */
  onClickGoToDetailPage = (match, rowInfo) => {
    return (
      <Link to={`${match.url}/${rowInfo.id}`}>{rowInfo.name} - {rowInfo.sub_name} </Link>
    )
  };

  render() {
    const {audienceData, isFetching, match} = this.props;
    return (
      <div>
        {isFetching && audienceData.length === 0 && <h2>Loading...</h2>}
        {!isFetching && audienceData.length === 0 && <h2>Empty.</h2>}
        {audienceData.length > 0 &&
        <div style={{opacity: isFetching ? 0.5 : 1}}>
          <AudienceRow
            audiences={audienceData}
            onClickGoToDetailPage={this.onClickGoToDetailPage}
            match={match}/>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {audienceData, isFetching} = state.audiences;
  return {
    audienceData,
    isFetching,
  };
}

export default connect(mapStateToProps)(AudiencesContainer);
