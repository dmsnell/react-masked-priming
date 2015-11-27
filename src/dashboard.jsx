import React from 'react';
import { Link } from 'react-router';

export default ( { stacks } ) => (
	<div>
		<p>Available Card Stacks</p>
		<ul>
			{ stacks.map( ( stack, i ) => <li key={ i }><Link to={ `/stacks/${ i }` }>Stack { i + 1 }</Link></li> ) }
		</ul>
	</div>
);

