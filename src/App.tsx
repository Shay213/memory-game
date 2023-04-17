import './App.css'
import { useState, useEffect } from 'react'
import createRandomCards from './utils/createRandomCards';
import { Card as ICard } from './utils/createRandomCards';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => setCards(createRandomCards()), []);

  function handleClick(current: HTMLDivElement | null) {
    const cardsCopy = [...cards];
    const id = current?.id as string;
    cardsCopy[+id].isClicked = true;
    setCards(cardsCopy);

    const updatedCards = [...cardsCopy];
    const cardsClicked = updatedCards.filter(card => card.isClicked);
    if(cardsClicked.length === 2){
      setTimeout(() => {
        const [card1, card2] = cardsClicked;
        if(card1.name === card2.name){
          card1.cardFound();
          card2.cardFound();
        }
        card1.isClicked = card2.isClicked = false;
        setCards(updatedCards);
      },1000);
    }
  } 

  return (
    <div className="App">
      <div className="gameContainer">
        <div className="cardsContainer">
          {cards.map((card, i) => (
            <Card 
              key={i} 
              card={card}
              handleClick={handleClick}
              id={i}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
