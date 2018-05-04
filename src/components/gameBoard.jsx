import React from 'react';
import Card from './card';

const Gameboard = ({playerHand, aiHand, selectItem, card}) =>{
	let playersDeck = playerHand.length;
	
	return(
			<div className="fl w-100 tc">
				<div className="fl w-50">
				<Card
					key={1}
					name={playerHand[card].name}
					manufact={playerHand[card].manufacturer}
					length={playerHand[card].length}
					itemClass={playerHand[card].starship_class}
					selectItem = {selectItem}
					/>
				</div>
				<div className="fl w-50">
				<Card
					key={1}
					name={aiHand[card].name}
					manufact={aiHand[card].manufacturer}
					length={aiHand[card].length}
					itemClass={aiHand[card].starship_class}
					selectItem = {selectItem}
					/>
				</div>
			</div>
		);

}

export default Gameboard;