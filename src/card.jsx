import React from 'react';

require( 'card.scss' );

export default ( { text = '\u2063', picture } ) => (
	<div className="card">
		{ picture && <img src={ picture } /> }
		{ picture && <br /> }
		<div>{ text }</div>
	</div>
);
