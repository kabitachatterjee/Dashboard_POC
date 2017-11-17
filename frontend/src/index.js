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
import configureStore from './store/configureStore';


// const store = configureStore();


ReactDOM.render(
	<Provider >
		<Router>
			<Route path="/" component={App}>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
