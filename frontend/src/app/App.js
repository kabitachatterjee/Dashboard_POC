import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import UUID from "uuid-js";

import Header from "./Components/Header/Header";
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
    // const {title, body, author, category} = postDetails;
    // const params = {
    //   title, body, author, category,
    //   id: UUID.create().hex,
    //   timestamp: +new Date(),
    // };
    // this.props.dispatch(addNewAudience(params));
    this.props.history.push(`/`);
  };

  render() {
    const {categories } = this.props;
    return (
      <div className='main'>
        <Header toggleDrawer={this.toggleDrawer}/>
        <Sidebar left={this.state.left}
                 onToggleDrawer={this.toggleDrawer}
        />
        <main className='mainBody'>
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

function mapStateToProps() {
  return {}
}

export default connect(
  mapStateToProps
)(App);
