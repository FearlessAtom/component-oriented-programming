import { useEffect } from "react";
import { Board, Card, GameResults, Modal, Portal, ScoreBoard } from "../../components";
import { useBoard } from "../../hooks";
import { useBoardStore, useSettingsStore } from "../../stores";
import useTimerStore from "../../stores/timerStore";
import styles from "../GamePage/GamePage.module.css";
import { useLocation } from "react-router-dom";

function GamePage() {
    const { flipCard, isFlipped } = useBoard();

    const cards = useBoardStore(state => state.cards);
    const isGameResultsModalOpen = useBoardStore(state => state.isGameResultsModalOpen);

    const isGameGoing = useSettingsStore(state => state.isGameGoing);

    const startTimer = useTimerStore(state => state.start);
    const stopTimer = useTimerStore(state => state.stop);

    const location = useLocation();

    const cardElements = cards.map((card, i) => 
        <Card
            card={ card }
            onFlip={ () => flipCard(card.cardId) }
            isFlipped={ isFlipped(card.cardId) }
            key={ i }
        />
    );

    useEffect(() => {
        if (location.pathname === "/game") {
            startTimer();
        } else {
            stopTimer();
        }

        return () => stopTimer();
    }, [location.pathname]);

    return <div className={styles["board-container"]}>
        <Board>
            { cardElements }
            { isGameGoing && <ScoreBoard /> }
        </Board>

        { isGameResultsModalOpen && 
            <Portal>
                <Modal>
                    <GameResults />
                </Modal>
            </Portal>
        }
    </div>
}

export default GamePage;
