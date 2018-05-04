import React from 'react';
import Card from './card';

const items = this.props

const Deck = ( {items, selectItem,player} ) =>{

	return(
		<div className={"player"+ player}>
			{
				items.map((item, i)=>
					{
						return(
							<Card 
								key={i}
								name={items[i].name}
								manufact={items[i].manufacturer}
								length={items[i].length}
								itemClass={items[i].starship_class}
								selectItem = {selectItem}
							/>	

						)
					}

				)			
					
			}
		</div>

		)

}

export default Deck;