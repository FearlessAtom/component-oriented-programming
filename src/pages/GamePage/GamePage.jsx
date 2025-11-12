import { Board, Card, ScoreBoard } from "../../components";
import styles from "../GamePage/GamePage.module.css";
import { getCards } from "../../utils/getCards";
import { BoardProvider, useSettings,  } from "../../providers";
import { useEffect, useState } from "react";

function GamePage() {
    const [cards, setCards] = useState([]);

    const settings = useSettings();

    useEffect (() => {
        setCards(getCards(settings.cardCount, settings.cardsToMatch));
    }, []);

    const cardElements = cards.map((card, i) => <Card
        cardImageName={ card }
        key={i}
    />);

    return <div className={styles["board-container"]}>
        <BoardProvider>
            <Board>
                { cardElements }
                <ScoreBoard />
            </Board>
        </BoardProvider>
    </div>
}

export default GamePage;
