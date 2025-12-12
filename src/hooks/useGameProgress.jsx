import { useEffect } from "react";
import { useBoardStore, useScoreStore, useSettingsStore } from "../stores";
import useGameControl from "./useGameControl";

function useGameProgress() {
    const { matchedCards } = useBoardStore();

    const moves = useScoreStore(state => state.moves);
    const percentage = useScoreStore(state => state.percentage);
    const setPercentage = useScoreStore(state => state.setPercentage);

    const { endGame } = useGameControl();

    const { isMoveLimited, moveLimit, cardCount } = useSettingsStore(state => state.settingsSnapshot);

    useEffect (() => {
        if (!(isMoveLimited && moveLimit - moves == 0)) return;

        setTimeout(endGame, 500);
    }, [moves]);

    useEffect(() => {
        if (percentage != 100) return;

        setTimeout(endGame, 500);
    }, [percentage]);

    useEffect(() => {
        const percentage = matchedCards.length / cardCount * 100;

        setPercentage(Math.floor(percentage));
    }, [matchedCards]);
}

export default useGameProgress;
