import Parser from 'mp-parser';

const config = `
Card -> show "⛩" for 500ms
Card -> show "Horse" for 100ms
Card -> show "House" and start clock

Card -> show "⛩" for 2000ms
Card -> show "cello" for 2000ms
Card -> show "violin" and start clock

Card -> show "⛩" for 500ms
Card -> show picture "/pictures/poodle.jpg" show "airedale" for 40ms
Card -> show picture "/pictures/poodle.jpg" for 100ms
Card -> show picture "/pictures/airedale.jpg" show "poodle" for 40ms
Card -> show picture "/pictures/airedale.jpg" and start clock

`;

export function getCardStacks() {
	return Parser
		.parse( config )
		.map( cardStack => cardStack.CardStack )
		.filter( stack => stack.length );
}

export function getCards( cardStack ) {
	return cardStack
		.map( card => card.Card );
}