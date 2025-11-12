import { Board, Card, ScoreBoard } from "../../components";
import styles from "../GamePage/GamePage.module.css";
import { getCards } from "../../utils/getCards";
import { BoardProvider, useSettings,  } from "../../providers";

function GamePage() {
    const settings = useSettings();

    let cards = getCards(settings.cardCount);

    cards = cards.map((card, i) => <Card
        cardImageName={ card }
        key={i}
    />);

    return <div className={styles["board-container"]}>
        <BoardProvider>
            <Board>
                { cards }
                <ScoreBoard />
            </Board>
        </BoardProvider>
    </div>
}

export default GamePage;
