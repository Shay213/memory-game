import './App.css'
import { useState, useEffect, useRef } from 'react'
import createRandomCards from './utils/createRandomCards';
import { Card as ICard } from './utils/createRandomCards';
import Card from './components/Card';
import canClickCard from './utils/canClickCard';

function App() {
  const [cards, setCards] = useState<ICard[]>([]);
  let isCardInAnimation = useRef<boolean>(false);

  useEffect(() => setCards(createRandomCards()), []);

  function handleClick(current: HTMLDivElement | null) {
    const id = current?.id as string;

    if(!canClickCard(cards, id, isCardInAnimation.current)) return;
    
    const cardsCopy = [...cards];
    cardsCopy[+id].isClicked = true;
    setCards(cardsCopy);

    const updatedCards = [...cardsCopy];
    const cardsClicked = updatedCards.filter(card => card.isClicked);
    if(cardsClicked.length === 2){
        const [card1, card2] = cardsClicked;
        const setIsClickedToFalse = () => {
          card1.isClicked = card2.isClicked = false;
          setCards(updatedCards);
        };
        if(card1.name === card2.name){
          card1.cardFound();
          card2.cardFound();
          setIsClickedToFalse();
        }else{
          setTimeout(() => {
            setIsClickedToFalse();
            isCardInAnimation.current = true;
            setTimeout(() => isCardInAnimation.current = false,500);
          },600);
        }
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
