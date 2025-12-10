import { useEffect } from "react";
import { useScore } from "../providers";
import { useGameControl, useGameProgress } from "../hooks";
import { useBoardStore, useSettingsStore } from "../stores";

function useBoard() {
    const {
        cards, setCards,
        flippedCards, setFlippedCards,
        cardsToMatchIds, setCardsToMatchIds,
        matchedCards, setMatchedCards,
    } = useBoardStore();

    const {
        cardsToMatch,
        isMoveLimited,
        isBoardLocked,
        moveLimit
    } = useSettingsStore();

    const score = useScore();

    const { startGame, stopGame, resumeGame, endGame } = useGameControl({ score });

    useGameProgress({ endGame, matchedCards, score });

    useEffect(startGame, []);

    useEffect(() => {
        if (cardsToMatchIds.length < cardsToMatch) return;

        score.setMoves(previous_value => previous_value + 1);

        let matched = true;

        for (let i = 0; i < cardsToMatchIds.length - 1; i++) {
            if (getCardById(cardsToMatchIds[i]).cardImageName !=
                getCardById(cardsToMatchIds[i + 1]).cardImageName) matched = false;
        }

        if (matched) {
            setMatchedCards([...matchedCards, ...cardsToMatchIds]);
            setCardsToMatchIds([]);
        }

        else {
            setTimeout(() => {
                setCardsToMatchIds([]);

                for (let i = flippedCards.length - 1; i >= 0; i--) {
                    if (!matchedCards.includes(flippedCards[i])) {
                        unflipCard(flippedCards[i]);
                    }
                }
            }, 1000);
        }
    }, [cardsToMatchIds]);

    const isFlipped = (cardId) => flippedCards.includes(cardId);
    const getCardById = (cardId) => cards.find(card => card.cardId == cardId);
    const unflipCard = (cardId) => setFlippedCards(useBoardStore.getState().flippedCards.filter(id => id !== cardId));

    const flipCard = (cardId) => {
        if (isBoardLocked) return;
        if (isMoveLimited && score.moves - moveLimit == 0) return;

        if (matchedCards.includes(cardId)) return;
        if (flippedCards.includes(cardId)) return;
        if (cardsToMatchIds.includes(cardId)) return;

        if(cardsToMatchIds.length >= cardsToMatch) return;

        setFlippedCards([...flippedCards, cardId]);
        setCardsToMatchIds([...cardsToMatchIds, cardId]);
    };

    return { flipCard, getCardById, isFlipped }
}

export default useBoard;
