import { useEffect } from "react";
import { useSettingsStore } from "../stores";

function useGameProgress({endGame, matchedCards, score, settings}) {
    const {cardCount, isMoveLimited, moveLimit} = useSettingsStore();

    useEffect (() => {
        if (!(isMoveLimited && moveLimit - score.moves == 0)) return;

        setTimeout(endGame, 500);
    }, [score.moves]);

    useEffect(() => {
        if (score.percentage != 100) return;

        setTimeout(endGame, 500);
    }, [score.percentage]);

    useEffect(() => {
        const percentage = matchedCards.length / cardCount * 100;

        score.setPercentage(Math.floor(percentage));
    }, [matchedCards]);
}

export default useGameProgress;
