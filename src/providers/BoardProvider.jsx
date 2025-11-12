import { useState, createContext, useContext } from "react";
import { useSettings, useScore } from "../providers";
import { useCardMatching } from "../hooks";

const BoardContext = createContext();

function BoardProvider({ children, refreshCards }) {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isGameResultsModalOpen, setIsGameResultsModalOpen] = useState(false);

    const score = useScore();
    const settings = useSettings();

    const resetCard = (cardId) => {
        const index = flippedCards.map(card => card.cardId).indexOf(cardId);

        if (index == -1) return;

        const card = flippedCards[index];

        card.setFlipped(false);

        flippedCards.splice(flippedCards.map(card => card.cardId).indexOf(cardId), 1);
        setFlippedCards(flippedCards);
    }


    const flipCard = (card) => {
        if (settings.isBoardLocked) return;

        if (matchedCards.map(card => card.cardId).includes(card.cardId)) return;

        if (!flippedCards.map(card => card.cardId).includes(card.cardId)) {
            if(flippedCards.length >= settings.cardsToMatch) return;

            card.setFlipped(true);
            setFlippedCards([...flippedCards, card]);
        }
    };

    const unflipCards = () => {
        for (let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].setFlipped(false);
        }
    }

    const startGame = () => {
        unflipCards();
        setIsGameResultsModalOpen(false);

        const delay = matchedCards != 0 ? 500 : 0;

        setTimeout(() => {
            score.resetScore();
            settings.setIsBoardLocked(false);
            settings.setIsGameGoing(true);
            setFlippedCards([]);
            setMatchedCards([]);
            refreshCards();
        }, delay);
    }

    const stopGame = () => {
        setIsGameResultsModalOpen(true);
        settings.setIsBoardLocked(true);
        settings.setIsGameGoing(false);
        score.timerStop();
    }

    const resumeGame = () => {
        setIsGameResultsModalOpen(false);
        settings.setIsBoardLocked(false);
        settings.setIsGameGoing(true);
        score.timerStart();
    }

    useCardMatching({ startGame, stopGame, resetCard, matchedCards, setMatchedCards, flippedCards, setFlippedCards });

    return <BoardContext.Provider value={{ flipCard, isGameResultsModalOpen, startGame, stopGame,  stopGame}}>
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
