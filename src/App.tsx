import './App.css'
import { useState, useEffect, useRef } from 'react'
import createRandomCards, { Card as ICard } from './utils/createRandomCards';
import Card from './components/Card';
import canClickCard from './utils/canClickCard';
import Score from './components/Score';

const isGameFinished = (cards: ICard[]) => cards.every(card => card.isFound); 

function App() {
  const [cards, setCards] = useState<ICard[]>([]);
  const isCardInAnimation = useRef<boolean>(false);
  const currentMoves = useRef<number>(0);
  const bestMoves = useRef<number>(Infinity);
  const showButton = useRef<boolean>(false);

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
        currentMoves.current++;
        if(isGameFinished(updatedCards)){
          bestMoves.current = currentMoves.current < bestMoves.current ? currentMoves.current : bestMoves.current;
          showButton.current = true;
        }
    }
  } 

  const resetGameRef = useRef<boolean>(false);
  const resetGame = () => {
    if(showButton.current) {
      resetGameRef.current = true;
      setCards(createRandomCards());
      currentMoves.current = 0;
      showButton.current = false;
      setTimeout(() => resetGameRef.current=false,100);
    }
  };

  return (
    <div className="App">
      <div className="gameContainer">
        <Score currentMoves={currentMoves.current} bestMoves={bestMoves.current}/>
        <div className="cardsContainer">
          {cards.map((card, i) => (
            <Card 
              key={i} 
              card={card}
              handleClick={handleClick}
              id={i}
              isGameFinished={resetGameRef.current}
            />
          ))}
        </div>
        <button 
          type='button' 
          style={{
            opacity: `${showButton.current ? '1':'0'}`,
            cursor: `${showButton.current ? 'pointer':'auto'}`
          }}
          onClick={resetGame}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default App
