import React from 'react';
import Card from "./card";
import Deck from "./deck";


const Playerhand = ( { deck, selectItem } ) =>{
		
		return(
				<div>
					{
						deck.map((hand, i)=>{
							let player = "player"+{i};
							return(<div>
									<Deck 
										key = {player} 
										items={hand}
										selectItem = {selectItem}
									/> 

								</div>
							)
						})
					}

				</div>

			)
}


export default Playerhand;