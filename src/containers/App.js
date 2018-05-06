import React, { Component } from 'react';
import './App.css';
import Card from '../components/card'

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
      player0Deck: [],
      player1Deck: [],
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
                      player0Deck: deck[0], 
                      player1Deck: deck[1], 
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

      while (count < players)
        {     
          splitDeck.push(deck.slice(start,end));          
          start = end;
          end = start + cardsPerPlayer;
          count += 1;
        }
    return(splitDeck);
}
  
advanceCard(card){

  const { playerDeckSize } = this.state;
  let nextCard = card;
                               //reset if end of deck is reached
    (card !== (playerDeckSize))? nextCard += 1 : nextCard = 0; 
  return(nextCard);
}

gameOver(){
  const {playerDeckSize, players} = this.state;
  if (playerDeckSize === 0 || playerDeckSize === (playerDeckSize * players)) {
    return true; 
  }else{
    return false; 
  }

}

sanitizeResults=(value)=>{

value === undefined? value = 0 : value;

  return (value);
}

  handleClick = (event) =>{

    const { card, playerDeckSize, player0Deck, player1Deck } = this.state;
    
    let winner = this.compareItems(player0Deck[card][event.target.id] ,player1Deck[card][event.target.id])

    this.moveCards( winner, event.target.id )
    //check to see if last move ended game
    //TODO print GameOver to board; 
    this.gameOver()? console.log("gameOver") 
      :this.setState({card: this.advanceCard(card)})

  }

  compareItems=(item1, item2)=>{
    let winner;

    item1 >= item2 ? winner = 0 : winner=1;
    
   return (winner)
  }

  moveCards(winner, key){
    const {player0Deck, card, player1Deck} = this.state;
    let cardToTransfer;
    let deck0 = player0Deck;
    let deck1 = player1Deck; 

    if (winner === 0){
      cardToTransfer = player1Deck[card];
      deck0.push(cardToTransfer);
      deck1.splice(card, 1 );

    }else{
      cardToTransfer = player0Deck[card];
      deck1.push(cardToTransfer);
      deck0.splice(card, 1);
    }

    this.setState({player0Deck: deck0,
                    player1Deck: deck1,
                    playerDeckSize: deck0.length})
  }



  render() {
    const { player0Deck, player1Deck, results, hasRun, card, playerDeckSize } = this.state;
    

    const playDeck = () =>{
      return(
            <div className="fl w-100 tc">
              <div className="fl w-50">
              <Card
                key={1}
                name={player0Deck[card].name}
                manufact={player0Deck[card].manufacturer}
                length={player0Deck[card].length}
                crew={player0Deck[card].crew}
                passengers={player0Deck[card].passengers}
                cargo={player0Deck[card].cargo_capacity}
                consumables={player0Deck[card].consumables}
                hyperdrive={player0Deck[card].hyperdrive_rating}
                itemClass={player0Deck[card].starship_class}
                player = {true}
                selectItem = {this.handleClick}
                />
              </div>
              <div className="fl w-50">
              <Card
                key={1}
                player = {false}
                />
            </div>
          </div> 
        )
    }

    return (
      <div className="fl w-100 bg-lightest-blue">
        <header className="App-header tc">
         <h1>Top Card</h1>
         <h2>Card: {card} of {playerDeckSize} </h2>
        </header>

        { hasRun?  playDeck()  : <h1> Building Deck</h1> }
      
      </div>
    );
  }
}

export default App;
