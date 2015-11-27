import React, { PropTypes } from 'react';

export default React.createClass( {
	propTypes: {
		action: PropTypes.func.isRequired,
		children: PropTypes.node,
		keyCode: PropTypes.number.isRequired
	},

	componentDidMount() {
		this.attach( this.props.action );
	},

	componentWillUnmount() {
		this.detach( this.props.action );
	},

	componentWillReceiveProps( nextProps ) {
		this.detach( this.props.action );
		this.attach( nextProps.action );
	},

	attach( action ) {
		window.addEventListener( 'keydown', this.handler( action ), true );
	},

	detach( action ) {
		window.removeEventListener( 'keydown', this.handler( action ), true );
	},

	handler( action ) {
		return ( event ) => {
			if ( event.keyCode === this.props.keyCode ) {
				event.preventDefault();
				event.stopPropagation();

				action( event );
			}
		};
	},

	render() { return this.props.children }
} );