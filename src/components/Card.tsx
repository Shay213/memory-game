import { useRef } from "react";
import { Card as ICard } from '../utils/createRandomCards'

interface Props{
  card: ICard,
  handleClick: (current: HTMLDivElement | null) => void, 
  id: number
}

export default ({card, handleClick, id}: Props) => {
    const imgSrc = `/${card.name}.svg`;
    const cardRef = useRef<HTMLDivElement>(null);
    const classNames = card.isFound || card.isClicked ? 'card active':'card';
    
    return (
      <div className="cardWrapper">
        <div onClick={() => handleClick(cardRef.current)} ref={cardRef} id={id+''} className={classNames}>
          <div className="front"><span style={{fontSize: '2.4rem'}}>?</span></div>
          <div className="back">
            <img 
              src={imgSrc} 
              alt="card" 
              style={{width: '70%'}}
            />
          </div>
        </div>
      </div>
    );
}