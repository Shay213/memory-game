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
  
export type CardNameStrings = keyof typeof CardName;

export class Card{
    #isClicked = false;
    #found = false;
    constructor(public name: CardNameStrings){
        this.name = name;
    }

    set isClicked(value: boolean){
        this.#isClicked = value;
    }

    cardFound() {
        this.#found = true;
    }

    get isClicked() {
        return this.#isClicked;
    }

    get isFound() {
        return this.#found;
    }
}

export default (): Card[] => {
    const cards: Card[] = [];
    const numOfCards = 16;
    const numOfCardName = 8;
    
    while(cards.length < numOfCards){
        const i = randomNumber(numOfCardName);
        const name = CardName[i] as CardNameStrings;
        
        if(cards.filter(card => card.name === name).length < 2){
            cards.push(new Card(name));
        }
    }
    
    return cards;
};

const randomNumber = (max: number) => Math.floor(Math.random()*max);