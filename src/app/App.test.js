import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {connect} from "react-redux";
jest.mock('./App');

import {fetchAllPosts} from "../posts/PostAction";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(connect(<App />), div);
});

describe('toggleDrawer', () => {
  beforeEach(() => {
    App.mockClear();
		App.toggleDrawer(true);
  });

  it('fetchAllPosts', () => {
    expect(fetchAllPosts).toHaveBeenCalled();
  });

  it
});