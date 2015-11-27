import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router';

import { getCardStacks, getCards } from 'card-lib';
import CardStack from 'card-stack';
import Dashboard from 'dashboard';

const stacks = getCardStacks();

const App = ( { children } ) => <div>{ children }</div>;
const CardStackWrapper = ( { params: { id } } ) => <CardStack cards={ getCards( stacks[ id ] ) } />;
const DashboardWrapper = () => <Dashboard stacks={ stacks } />;

ReactDOM.render( (
	<Router>
		<Route path="/" component={ App }>
			<IndexRoute component={ DashboardWrapper } />
			<Route path="/stacks/:id" component={ CardStackWrapper } />
		</Route>
	</Router>
), document.getElementById( 'app-container' ) );