import { useEffect } from "react";
import { useGameControl, useGameProgress } from "../hooks";
import { useBoardStore, useScoreStore, useSettingsStore } from "../stores";

function useBoard() {
    const cards = useBoardStore(state => state.cards);
    const flippedCards = useBoardStore(state => state.flippedCards);
    const setFlippedCards = useBoardStore(state => state.setFlippedCards);
    const cardsToMatchIds = useBoardStore(state => state.cardsToMatchIds);
    const setCardsToMatchIds = useBoardStore(state => state.setCardsToMatchIds);
    const matchedCards = useBoardStore(state => state.matchedCards);
    const setMatchedCards = useBoardStore(state => state.setMatchedCards);

    const moves = useScoreStore(state => state.moves);
    const setMoves = useScoreStore(state => state.setMoves);

    const isGameGoing = useSettingsStore(state => state.isGameGoing);
    const isBoardLocked = useSettingsStore(state => state.isBoardLocked);

    const { moveLimit, isMoveLimited, cardsToMatch } = useSettingsStore(state => state.settingsSnapshot);

    const { startGame, stopGame, resumeGame, endGame } = useGameControl();

    useEffect(startGame, []);
    useGameProgress();

    useEffect(() => {
        if (cardsToMatchIds.length < cardsToMatch) return;

        setMoves(useScoreStore.getState().moves + 1);

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
        if (isMoveLimited && moves - moveLimit == 0) return;

        if (matchedCards.includes(cardId)) return;
        if (flippedCards.includes(cardId)) return;
        if (cardsToMatchIds.includes(cardId)) return;

        if(cardsToMatchIds.length >= cardsToMatch) return;

        setFlippedCards([...flippedCards, cardId]);
        setCardsToMatchIds([...cardsToMatchIds, cardId]);
    };

    return { flipCard, getCardById, isFlipped, unflipCard }
}

export default useBoard;
