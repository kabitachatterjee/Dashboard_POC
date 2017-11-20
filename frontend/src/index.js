import React from 'react';
import ReactDOM from 'react-dom';
import './app/index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import {logger} from 'redux-logger';
import { rootReducer } from './app/reducers';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(logger)
	)
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={App}>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
