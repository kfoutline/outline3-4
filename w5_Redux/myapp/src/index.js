import React from 'react';
import {render} from 'react-dom';

import {HashRouter as Router} from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import store from './store';

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	, document.getElementById('root'));

registerServiceWorker();
