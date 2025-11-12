import { useState, useEffect, createContext, useContext } from "react";
import { useScore } from "./ScoreProvider";
import { useSettings } from "./SettingsProvider";

const BoardContext = createContext();

function BoardProvider({ children, refreshCards }) {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isGameResultsModalOpen, setIsGameResultsModalOpen] = useState(false);

    const score = useScore();
    const settings = useSettings();

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

    useEffect(() => {
        startGame();

        return () => {
            score.timerStop();
        };
    }, []);

    useEffect (() => {
        if (!settings.isGameGoing) return;
        if (!(settings.isMoveLimited && settings.moveLimit - score.moves == 0)) return;

        setTimeout(stopGame, 500);
    }, [score.moves]);

    useEffect(() => {
        if (!settings.isGameGoing) return;
        if (score.percentage != 100) return

        setTimeout(stopGame, 500);
    }, [score.percentage]);

    useEffect(() => {
        const percentage = matchedCards.length / settings.cardCount * 100;

        score.setPercentage(Math.floor(percentage));
    }, [matchedCards]);

    useEffect(() => {
        if (flippedCards.length < settings.cardsToMatch) return

        score.setMoves(previous_value => previous_value + 1);

        let matched = true;

        for (let i = 0; i < flippedCards.length - 1; i++) {
            if (flippedCards[i].cardImageName != flippedCards[i + 1].cardImageName) matched = false;
        }

        if (matched) {
            setMatchedCards([...matchedCards, ...flippedCards]);
            setFlippedCards([]);
        }

        else {
            setTimeout(() => {
                while(flippedCards.length > 0) {
                    resetCard(flippedCards[0].cardId);
                }
            }, 1000)
        }
    }, [flippedCards]);

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

    return <BoardContext.Provider value={{ flipCard, isGameResultsModalOpen, startGame, stopGame, resumeGame }}>
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
