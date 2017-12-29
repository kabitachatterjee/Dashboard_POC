import React from 'react';
import ReactDOM from 'react-dom';
import './app/index.css';

import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {
	BrowserRouter as Router,
	Route, Switch,
} from 'react-router-dom'
import configureStore from './store/configureStore';
import PostDetails from "./detailPost/PostDetails";
import SpecificCategory from "./app/SpecificCategory";
import NotFound from "./NotFound";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={App}/>
				{/*<Route path="/:subreddit" component={SpecificCategory}/>*/}
				<Route path="/category" component={PostDetails}/>
				<Route component={NotFound} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

