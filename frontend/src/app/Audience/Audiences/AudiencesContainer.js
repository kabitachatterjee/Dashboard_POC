import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchAllPosts} from "../../actions/AudienceAction";
import Post from "./AudienceRow";

class AudiencesContainer extends Component {
	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(fetchAllPosts());
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

  render(){
		const {items, isFetching} = this.props;
		console.log(this.props,"!!")
		return(
			<div>
				{isFetching && items.length === 0 && <h2>Loading...</h2>}
				{!isFetching && items.length === 0 && <h2>Empty.</h2>}
				{items.length > 0 &&
				<div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <div>
            {this.props.posts.length === 0 && <div><p>Loading</p></div>}
            {this.props.posts.length > 0 && this.props.posts
              .sort((a, b) => b[this.props.sortOrder] - a[this.props.sortOrder])
              .map((item) => item.deleted ?
                "" :
                <Post key={item.id}
                      deletePost={this.deletePost}
                      post={item}
                      votePostWithId={this.voteForPost}/>)
            }
          </div>
				</div>}
			</div>
		)
	}
}


function mapStateToProps(state) {
	const { postsByCategory, selectedCategory} = state;
	const { isFetching, lastUpdated, items } = postsByCategory[selectedCategory] ||
	{
		isFetching: true,
		items: []
	};
	return {
    isFetching,
    items,
    lastUpdated,
    selectedCategory: state.selectedCategory,
    sortOrder: state.postSortReducer.sortOrder,
  };
}

export default connect(mapStateToProps)(AudiencesContainer);
