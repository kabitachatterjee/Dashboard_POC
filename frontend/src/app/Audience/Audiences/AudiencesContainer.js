import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchAllAudiences} from "../../actions/AudiencesAction";
import AudienceRow from "./AudienceRow";

class AudiencesContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchAllAudiences());
  }

  redirectHome = () => {
    this.props.history.push(`/`);
  };

  /**
   * Votes the post's vote score.
   * @param {{id: number}} postDetails
   * @param {string} voteDirection
   */
  voteForPost = (postDetails, voteDirection) => {
    this.props.voteForPostId(postDetails, voteDirection, this.props.selectedCategory);
  };

  /**
   * Sets the property (Deleted) on the post to true. Then, re-routes to home page.
   * @param {{
   * parentId: string,
   * timestamp: number,
   * body: string,
   * author: string,
   * voteScore: number,
   * deleted: boolean,
   * parentDeleted: boolean,
   * }} postDetails
   */
  deletePost = (postDetails) => {
    this.props.deleteSinglePost(postDetails, this.props.selectedCategory);
    this.props.comeHome();
  };

  render() {
    const {audienceData, isFetching} = this.props;
    return (
      <div>
        {isFetching && audienceData.length === 0 && <h2>Loading...</h2>}
        {!isFetching && audienceData.length === 0 && <h2>Empty.</h2>}
        {audienceData.length > 0 &&
        <div style={{opacity: isFetching ? 0.5 : 1}}>
          <AudienceRow audiences={audienceData}/>
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
