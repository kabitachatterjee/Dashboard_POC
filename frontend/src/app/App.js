import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import UUID from "uuid-js";

import Header from "./Components/Header/Header";
import {fetchAudiencesFirst} from "./actions/AudiencesAction";
import {addNewPost, fetchAllPosts, setPostSortOrder} from "./actions/AudienceAction";
import SortPostContainer from "./SortPostContainer";
import Sidebar from "./Components/SideBar/Sidebar";
import Routes from "./Components/Routes";

class App extends Component {
  state = {
    left: false,
  };

  /**
   * Opens sidebar drawer.
   * @param {boolean} open
   */
  toggleDrawer = (open) => () => {
    fetchAllPosts();
    this.setState({
      left: open,
    });
  };

  /**
   * Submits the post details necessary for creating a new post.
   * @param {{
   * title: string,
   * id: number,
   * author: string,
   * category: string,
   * }} postDetails
   */
  submitNewPost = (postDetails) => {
    const {title, body, author, category} = postDetails;
    const params = {
      title, body, author, category,
      id: UUID.create().hex,
      timestamp: +new Date(),
    };
    this.props.dispatch(addNewPost(params));
    this.props.history.push(`/`);
  };

  /**
   * Gets value from SortPostContainer.
   * @param {string} sortOrder
   */
  passSortOrder = (sortOrder) => {
    this.props.dispatch(setPostSortOrder(sortOrder, false));
  };

  /**
   * Hides the post sort drop on non-applicable pages.
   */
  hideSortDropDown = () => {
    this.props.dispatch(setPostSortOrder("timestamp", true));
  };

  /**
   * Changes the selected category to 'all' and fetches all
   * the posts.
   */
  componentDidMount() {
    this.props.dispatch(fetchAudiencesFirst());
  };

  render() {
    const {categories, hideSortDropDown} = this.props;
    return (
      <div className='main'>
        <Header toggleDrawer={this.toggleDrawer}/>
        <Sidebar left={this.state.left}
                 onToggleDrawer={this.toggleDrawer}
        />
        <main className='mainBody'>
          {!hideSortDropDown && <SortPostContainer passSortOrder={this.passSortOrder}/>}
          <Routes
            categories={categories}
            submitChanges={this.submitNewPost}
            hideSortDropDown={this.hideSortDropDown}
          />
        </main>
      </div>
    );
  }
}

function mapStateToProps({selectedCategory, allCategories, postSortReducer}) {
  const categories = allCategories.items;
  const hideSortDropDown = postSortReducer.hideSortDropDown;
  return {
    selectedCategory,
    categories,
    hideSortDropDown
  }
}

export default connect(
  mapStateToProps
)(App);
