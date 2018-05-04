import React from 'react';
import porg from '../images/porg.jpg';
import cardstyles from "./cardstyles.css";

const props = this.props;

const Card= ({name, itemClass, manufact, selectItem, length}) => {
		
		return(
			<div className="card tc bg-blue dib br3 pa3 ma2 bw2 shadow-5">
				<img alt="name of item" className="cardImage" src={porg}/>
				<h3>{name}</h3>
				<h4>{itemClass}</h4>
				<h5>{manufact}</h5>
				<button id= "length" 
						className="tc br1 grow bw2 bg-light-blue" 
						value={length} 
						onClick ={selectItem}> 
									Length: {length} 
				</button>
			</div>
			)

}

export default Card; 