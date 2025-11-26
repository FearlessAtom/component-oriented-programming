import { useState, createContext, useContext, useEffect } from "react";
import { useSettings, useScore } from "../providers";
import { useGameControl, useGameProgress } from "../hooks";

const BoardContext = createContext();

function BoardProvider({ children }) {
    const [cards, setCards] = useState([]);
    const [cardsToMatchIds, setCardsToMatchIds] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isGameResultsModalOpen, setIsGameResultsModalOpen] = useState(false);

    const score = useScore();
    const settings = useSettings();

    const {startGame, stopGame, resumeGame, endGame} = useGameControl({
        cards,
        setCards,
        setFlippedCards,
        setMatchedCards,
        setCardsToMatchIds,
        setIsGameResultsModalOpen,
        matchedCards,
        score,
        settings,
    });

    useGameProgress({endGame, matchedCards, score, settings});

    useEffect(startGame, []);

    useEffect(() => {
        if (cardsToMatchIds.length < settings.cardsToMatch) return;

        score.setMoves(previous_value => previous_value + 1);

        let matched = true;

        for (let i = 0; i < cardsToMatchIds.length - 1; i++) {
            if (getCardById(cardsToMatchIds[i]).cardImageName != getCardById(cardsToMatchIds[i + 1]).cardImageName) matched = false;
        }

        if (matched) {
            setMatchedCards([...matchedCards, ...cardsToMatchIds]);
            setCardsToMatchIds([]);
        }

        else {
            setTimeout(() => {
                setFlippedCards([]);
                setCardsToMatchIds([]);
            }, 1000);
        }
    }, [cardsToMatchIds]);

    const isFlipped = (cardId) => flippedCards.includes(cardId);
    const getCardById = (cardId) => cards.find(card => card.cardId == cardId);

    const flipCard = (cardId) => {
        if (settings.isBoardLocked) return;
        if (settings.isMoveLimited && score.moves - settings.moveLimit == 0) return;

        if (matchedCards.includes(cardId)) return;
        if (flippedCards.includes(cardId)) return;
        if (cardsToMatchIds.includes(cardId)) return;

        if(cardsToMatchIds.length >= settings.cardsToMatch) return;

        setFlippedCards([...flippedCards, cardId]);
        setCardsToMatchIds([...cardsToMatchIds, cardId]);
    };

    return <BoardContext.Provider value={{cards, flipCard, isFlipped, isGameResultsModalOpen, startGame, stopGame, endGame, resumeGame  }}>
        { children }
    </BoardContext.Provider>
}

function useBoard() {
    const context = useContext(BoardContext);

    if (!context) {
        throw new Error('useBoard must be used within BoarderProvider');
    }

    return context;
}

export { BoardProvider, useBoard }
