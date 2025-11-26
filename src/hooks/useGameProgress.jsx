import { useEffect } from "react";

function useGameProgress({endGame, matchedCards, score, settings}) {
    useEffect (() => {
        if (!(settings.isMoveLimited && settings.moveLimit - score.moves == 0)) return;

        setTimeout(endGame, 500);
    }, [score.moves]);

    useEffect(() => {
        if (score.percentage != 100) return;

        setTimeout(endGame, 500);
    }, [score.percentage]);

    useEffect(() => {
        const percentage = matchedCards.length / settings.cardCount * 100;

        score.setPercentage(Math.floor(percentage));
    }, [matchedCards]);
}

export default useGameProgress;
