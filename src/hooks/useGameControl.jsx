import getCards from "../utils/getCards";
import { useBoardStore, useScoreStore, useSettingsStore } from "../stores";
import { get_uuid } from "../utils/utils";
import { useResultsStore, useTimerStore } from "../stores";

function useGameControl() {
    const cards = useBoardStore(state => state.cards);
    const setCards = useBoardStore(state => state.setCards);
    const matchedCards = useBoardStore(state => state.matchedCards);
    const setMatchedCards = useBoardStore(state => state.setMatchedCards);
    const setFlippedCards = useBoardStore(state => state.setFlippedCards);
    const setCardsToMatchIds = useBoardStore(state => state.setCardsToMatchIds);
    const setIsGameResultsModalOpen = useBoardStore(state => state.setIsGameResultsModalOpen);

    const cardsToMatch = useSettingsStore(state => state.cardsToMatch);
    const isMoveLimited = useSettingsStore(state => state.isMoveLimited);
    const moveLimit = useSettingsStore(state => state.moveLimit);
    const isGameGoing = useSettingsStore(state => state.isGameGoing);
    const setIsGameGoing = useSettingsStore(state => state.setIsGameGoing);
    const setIsBoardLocked = useSettingsStore(state => state.setIsBoardLocked);
    const syncSettingsSnapshot = useSettingsStore(state => state.syncSettingsSnapshot);

    const moves = useScoreStore(state => state.moves);
    const percentage = useScoreStore(state => state.percentage);

    const startTimer = useTimerStore(state => state.start);
    const resetTimer = useTimerStore(state => state.reset);

    const { resetScore } = useScoreStore();

    const addResult  = useResultsStore(state => state.addResult);

    const {  } = useSettingsStore(state => state.settingsSnapshot);

    const startGame = () => {
        const delay = matchedCards.length != 0 ? 500 : 0;

        setTimeout(() => {
            if (!useSettingsStore.getState().isGameGoing) {
                console.log("sync");
                syncSettingsSnapshot();

                setCards(getCards(useSettingsStore.getState().settingsSnapshot.cardCount,
                    useSettingsStore.getState().settingsSnapshot.cardsToMatch));
                
                setIsBoardLocked(false);
            }

            startTimer();
            setIsGameGoing(true);
        }, delay);
    }

    const resetGame = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        setIsGameGoing(false);
        setCardsToMatchIds([]);
        setIsGameResultsModalOpen(false);
        resetScore();
        resetTimer()
    }

    const stopGame = () => {
        setIsGameResultsModalOpen(true);
        setIsBoardLocked(true);
        setIsGameGoing(false);
    }

    const resumeGame = () => {
        setIsGameResultsModalOpen(false);
        setIsBoardLocked(false);
        setIsGameGoing(true);
    }

    const endGame = () => {
        addResult({
            id: get_uuid(),
            cards,
            moves,
            isMoveLimited,
            moveLimit,
            cardsToMatch,
            percentage
        });

        stopGame();
    }

    return { startGame, stopGame, resumeGame, endGame, resetGame };
}

export default useGameControl;
