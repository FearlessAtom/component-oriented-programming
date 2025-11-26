import getCards from "../utils/getCards";

function useGameControl({
    cards,
    setCards,
    setFlippedCards,
    setMatchedCards,
    setCardsToMatchIds,
    setIsGameResultsModalOpen,
    matchedCards,
    score,
    settings,
}) {
    const startGame = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        setCardsToMatchIds([])
        setIsGameResultsModalOpen(false);

        const delay = matchedCards.length != 0 ? 500 : 0;

        setTimeout(() => {
            score.resetScore();
            settings.setIsBoardLocked(false);
            settings.setIsGameGoing(true);
            setCards(getCards(settings));
        }, delay);
        
        settings.setIsGameGoing(true);
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

    const endGame = () => {
        console.log(JSON.stringify(cards));
        stopGame();
    }

    return { startGame, stopGame, resumeGame, endGame };
}

export default useGameControl;
