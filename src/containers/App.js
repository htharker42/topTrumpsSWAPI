import React, { Component } from 'react';
import './App.css';
import Gameboard from '../components/gameBoard'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasRun: false,
      results: [],
      playersChoice: "",
      players: 2,
      playerChoiceKey: "",
      playerDeckSize: 0,
      playerDeck: [],
      aiDeck: [],
      card: 0,
    }
  }

  componentDidMount() {
    const urls = [
      "https://swapi.co/api/starships/?format=json&page=1",
      "https://swapi.co/api/starships/?format=json&page=2",
      "https://swapi.co/api/starships/?format=json&page=3",
      "https://swapi.co/api/starships/?format=json&page=4"
    ]

    Promise.all(urls.map(url=> {
      return fetch(url).then(resp => resp.json())
    })).then(results =>{
      let deck = this.stackDeck(results);
      this.setState({
                      results: results, 
                      playerDeck: deck[0], 
                      aiDeck: deck[1], 
                      playerDeckSize: deck[0].length,
                      hasRun: true});
                  })
    }

  stackDeck(cardArray){
    let deck = [];
    cardArray.forEach((cardStack) => {
      cardStack.results.forEach((card)=>{
        deck.push(card)
      })    
    })
    deck = this.shuffleDeck(deck);
    deck = this.cutDeck(deck);
    return deck;
  }

  shuffleDeck(deck){
      let currentIndex = deck.length;
      let tempValue = [];
      let randomIndex = 0;

      while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = tempValue;
  }
  return(deck);
}

cutDeck(deck){
    const {players} = this.state;
    let cardsPerPlayer = Math.floor(deck.length / players) - 1;
    let start = 0;
    let count = 0;
    let end = cardsPerPlayer;
    let splitDeck = [];
    let player = "";

      while (count < players)
        {     
          splitDeck.push(deck.slice(start,end));          
          start = end;
          end = start + cardsPerPlayer;
          count += 1;
        }
    return(splitDeck);
}

  handleClick = (event) =>{
    const { card, playerDeckSize } = this.state;
    console.log(event.target.id, event.target.value)
    let cardPrime = card;
    (card === (playerDeckSize-1))? cardPrime += 1 : cardPrime = 0; 
    console.log(card, cardPrime)
    this.setState({ 
                    playerChoiceKey: event.target.id, 
                    playersChoice: event.target.value,
                    card: cardPrime 
                  })
  }

  render() {
    const { results, hasRun, players, card, playerDeckSize } = this.state;
    let deck = [];
    hasRun? deck = this.stackDeck(results) : console.log("loading");
    let playerHand=deck[0];
    let aiHand = deck[1];
  
    return (
      <div className="fl w-100 bg-lightest-blue">
        <header className="App-header tc">
         <h1>Top Card</h1>
         <h2>Card: {card} of {playerDeckSize} </h2>
        </header>

        { 
          hasRun ? 
            <Gameboard card={card} playerHand={playerHand} aiHand={aiHand} selectItem={this.handleClick}/> : 
            <h1> Building Deck </h1>
        }
      
      </div>
    );
  }
}

export default App;
