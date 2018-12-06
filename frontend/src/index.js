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
import NotFound from "./NotFound";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/404" component={NotFound} />
				<Route path="/" component={App}/>
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

