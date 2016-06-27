import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { render } from 'react-dom';

import Root from './components/Root';
import Boring from './components/Boring';
import Heavy from './components/Heavy';

import './styles/styles.styl';

if (module.hot) {
	module.hot.accept();
}

render(
	<Router history={browserHistory}>
		<Route path='/' component={Root}>
			<Route path='/boring' component={Boring} /> 
			<Route path='/heavy' component={Heavy} />
            <Redirect from='/webpack-demo' to='/' />
		</Route>
	</Router>
	, document.getElementById('app'));
