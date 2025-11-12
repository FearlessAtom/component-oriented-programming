import { Board, BoardContent, Card, GameResults, Modal, Portal, ScoreBoard } from "../../components";
import styles from "../GamePage/GamePage.module.css";
import { getCards } from "../../utils/getCards";
import { BoardProvider, useBoard, useSettings,  } from "../../providers";
import { useEffect, useState } from "react";

function GamePage() {
    const [cards, setCards] = useState([]);

    const settings = useSettings();

    const refreshCards = () => {
        setCards(getCards(settings.cardCount, settings.cardsToMatch));
    }

    return <div className={styles["board-container"]}>
        <BoardProvider refreshCards={ refreshCards }>
            <BoardContent cards={cards}/>
        </BoardProvider>
    </div>
}

export default GamePage;
