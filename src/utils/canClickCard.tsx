import { Card as ICard } from './createRandomCards'

export default (cards: ICard[], id: string|number, isCardInAnimation: boolean) => {
    if(
        cards.filter(card => card.isClicked).length === 2 ||
        cards[+id].isClicked === true ||
        cards[+id].isFound === true ||
        isCardInAnimation 
    ) return false;

    return true;
};