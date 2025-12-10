import { useBoardStore, useSettingsStore } from "../stores";
import getCards from "../utils/getCards";
import useResults from "./useResults";

function useGameControl({ score }) {
    const {
        cards, setCards,
        matchedCards, setMatchedCards,
        setFlippedCards, setCardsToMatchIds,
        setIsGameResultsModalOpen,
    } = useBoardStore();

    const {
        cardCount,
        cardsToMatch,
        setIsBoardLocked,
        setIsGameGoing
    } = useSettingsStore();

    const results = useResults();

    const startGame = () => {
        setCards([]);
        setFlippedCards([]);
        setMatchedCards([]);
        setCardsToMatchIds([]);
        setIsGameResultsModalOpen(false);
        score.resetScore();

        const delay = matchedCards.length != 0 ? 500 : 0;

        setTimeout(() => {
            setIsBoardLocked(false);
            setIsGameGoing(true);
            setCards(getCards(cardCount, cardsToMatch));
        }, delay);
        
        setIsGameGoing(true);
    }

    const stopGame = () => {
        setIsGameResultsModalOpen(true);
        setIsBoardLocked(true);
        setIsGameGoing(false);
        score.timerStop();
    }

    const resumeGame = () => {
        setIsGameResultsModalOpen(false);
        setIsBoardLocked(false);
        setIsGameGoing(true);
        score.timerStart();
    }

    const endGame = () => {
        results.addResult(results.createResult(cards, score));
        stopGame();
    }

    return { startGame, stopGame, resumeGame, endGame };
}

export default useGameControl;
