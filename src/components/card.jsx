import React from 'react';
import porg from '../images/porg.jpg';
import cardstyles from "./cardstyles.css";

const Card = ({name, 
				itemClass, 
				manufact, 
				selectItem, 
				player, 
				crew,
				passengers, 
				cargo, 
				consumables, 
				hyperdrive, 
				length}) => {

		return( 

				<div className="card tc bg-blue dib br3 pa3 ma2 bw2 shadow-5">
				<img alt="name of item" className="cardImage" src={porg}/>
				<h3>{name}</h3>
				<h4>{itemClass}</h4>
				<h5>{manufact}</h5>
		
				<button id= "length" 
						className="tc br1 dim bw2 bg-light-blue" 
						value={length} 
						onClick ={selectItem}> 
									Length: {length} 
				</button><br/>
				<button id= "crew" 
						className="tc br1 dim bw2 bg-light-blue" 
						value={crew} 
						onClick ={selectItem}> 
									Crew: {crew} 
				</button><br/>
				<button id= "passengers" 
						className="tc br1 dim bw2 bg-light-blue" 
						value={passengers} 
						onClick ={selectItem}> 
									Passengers: {passengers} 
				</button><br/>
				<button id= "consumables" 
						className="tc br1 dim bw2 bg-light-blue" 
						value={consumables} 
						onClick ={selectItem}> 
									Consumables: {consumables} 
				</button><br/>
				<button id= "hyperdrive_rating" 
						className="tc br1 dim bw2 bg-light-blue" 
						value={hyperdrive} 
						onClick ={selectItem}> 
									Hyperdrive Rating: {hyperdrive} 
				</button>
			</div> 
			
			)

}

export default Card; 
