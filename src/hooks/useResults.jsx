import { useSettingsStore } from "../stores";
import { get_uuid } from "../utils/utils";

function useResults() {
    const {cardsToMatch, isMoveLimited, moveLimit} = useSettingsStore();
    
    const getResults = () => {
        return JSON.parse(localStorage.getItem("results")) ?? [];
    }

    const getResult = (resultId) => {
        const results = getResults();

        return results.find(result => result.id == resultId);
    }

    const addResult = (result) => {
        let results = getResults();

        results = [...results, result];

        localStorage.setItem("results", JSON.stringify(results));
    }

    const createResult = (cards, score) => {
        return {
            id: get_uuid(),
            cards: cards,
            moves: score.moves,
            isMoveLimited,
            moveLimit,
            cardsToMatch,
            percentage: score.percentage
        }
    }

    return {getResults, getResult, addResult, createResult}
}

export default useResults;
