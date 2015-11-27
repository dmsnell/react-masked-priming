import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import keycode from 'keycode';

import Card from 'card';
import HotkeyWrapper from 'hotkey-wrapper';

let creationTime;
let responseTime;

export default React.createClass( {
	propTypes: {
		cards: PropTypes.arrayOf( PropTypes.object ).isRequired
	},

	getInitialState: () => ( {
		cardIndex: 0
	} ),

	componentDidMount() {
		this.scheduleCardFlip();
	},

	scheduleCardFlip() {
		const card = this.props.cards[ this.state.cardIndex ];

		if ( card.delay ) {
			setTimeout( () => {
				if ( ! this.isMounted() ) { return; }

				this.setState( { cardIndex: this.state.cardIndex + 1 }, this.scheduleCardFlip );
			}, card.delay )
		}
	},

	stopTimer() {
		if ( responseTime ) { return; }

		responseTime = performance.now();
		console.log( `Took ${ Math.round( responseTime - creationTime ) }ms` );
	},

	render() {
		const { text, picture, command } = this.props.cards[ this.state.cardIndex ];

		if ( 'start clock' === command ) {
			creationTime = performance.now();
			responseTime = null;
		}

		return (
			<div>
				←<Link to="/">Back</Link>
				<HotkeyWrapper keyCode={ keycode( 'space' ) } action={ creationTime ? this.stopTimer : () => {} }>
					<Card { ...{ text, picture } } />
				</HotkeyWrapper>
			</div>
		);
	}
} );