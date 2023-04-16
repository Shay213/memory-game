enum CardName {
    chameleon,
    crocodile,
    kangaroo,
    lion,
    owl,
    pelican,
    rooster,
    toucan
};
  
type CardNameStrings = keyof typeof CardName;

class Card{
    private isClicked = false;
    private found = false;
    constructor(public name: CardNameStrings){
    this.name = name;
    }
}

export default (): Card[] => {
    const cards: Card[] = [];
    const numOfCards = 16;
    const numOfCardName = 8;
    
    while(cards.length < numOfCards){
        const i = randomNumber(numOfCardName);
        const name = CardName[i] as CardNameStrings;
        console.log(i);
        if(cards.filter(card => card.name === name).length < 2){
            cards.push(new Card(name));
        }
    }
    return cards;
};

const randomNumber = (max: number) => Math.floor(Math.random()*max);