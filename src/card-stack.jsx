import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import keycode from 'keycode';

import Card from 'card';
import HotkeyWrapper from 'hotkey-wrapper';

export default React.createClass( {
	propTypes: {
		cards: PropTypes.arrayOf( PropTypes.object ).isRequired
	},

	getInitialState: () => ( {
		cardIndex: 0,
		clockIsRunning: false
	} ),

	componentDidMount() {
		React.initializeTouchEvents( true );
		this.scheduleCardFlip();
	},

	scheduleCardFlip() {
		const card = this.props.cards[ this.state.cardIndex ];
		if ( 'start clock' === card.command ) {
			this.startClock();
		}

		if ( card.delay ) {
			setTimeout( () => {
				if ( ! this.isMounted() ) { return; }

				this.setState( { cardIndex: this.state.cardIndex + 1 }, this.scheduleCardFlip );
			}, card.delay )
		}
	},

	startClock() {
		this.setState( {
			clockIsRunning: true,
			creationTime: performance.now(),
			responseTime: null
		} );
	},

	stopClock() {
		if ( ! this.state.clockIsRunning ) { return; }

		this.setState( {
			clockIsRunning: false,
			responseTime: performance.now()
		} );
	},

	render() {
		const { creationTime, responseTime } = this.state;
		const { text, picture } = this.props.cards[ this.state.cardIndex ];

		return (
			<div style="cursor: pointer;" onTouchStart={ this.stopClock }>
				←<Link to="/">Back</Link>
				<HotkeyWrapper keyCode={ keycode( 'space' ) } action={ this.stopClock }>
					<Card { ...{ text, picture } } />
				</HotkeyWrapper>
				{ responseTime && <p>Answered in { Math.round( responseTime - creationTime ) }ms</p> }
			</div>
		);
	}
} );