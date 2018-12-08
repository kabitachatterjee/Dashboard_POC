import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {connect} from "react-redux";
jest.mock('./App');

import {fetchAllAudiences} from "./actions/AudienceAction";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(connect(<App />), div);
});

describe('toggleDrawer', () => {
  beforeEach(() => {
    App.mockClear();
		App.toggleDrawer(true);
  });

  it('fetchAllAudiences', () => {
    expect(fetchAllAudiences).toHaveBeenCalled();
  });

  it
});
