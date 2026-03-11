import { useState } from "react";
import { Board, Card }  from "../components";
import getCardImageNames from "../utils/getCardImageNames";
import { get_uuid } from "../utils/utils";

const createCards = (cardImages, flippedCards, setFlippedCards) => {
    const cards = cardImages.map((cardImageName, i) => (
        <Card 
            key={ i }
            card={{
                cardImageName,
                position: i,
                cardId: get_uuid(),
            }}
            isFlipped={ flippedCards[i] ?? false }
            onFlip={ () => setFlippedCards(previous => ({ ...previous, [i]: !previous[i] })) }
        />
    ));

    return cards;
}

export const Default = {
    render: () => {
        return <Board></Board>;
    },
};

export const Small = {
    render: () => {
        const [cardImages, setCardImages] = useState(getCardImageNames(4, 2));
        const [flippedCards, setFlippedCards] = useState({});

        const cards = createCards(cardImages, flippedCards, setFlippedCards);

        return <Board>{ cards }</Board>;
    },
};

export const Medium = {
    render: () => {
        const [cardImages, setCardImages] = useState(getCardImageNames(16, 4));
        const [flippedCards, setFlippedCards] = useState({});

        const cards = createCards(cardImages, flippedCards, setFlippedCards);

        return <Board>{ cards }</Board>;
    },
};

export const Large = {
    render: () => {
        const [cardImages, setCardImages] = useState(getCardImageNames(30, 5));
        const [flippedCards, setFlippedCards] = useState({});

        const cards = createCards(cardImages, flippedCards, setFlippedCards);

        return <Board>{ cards }</Board>;
    },
};

const meta = {
    component: Board,
};

export default meta;
