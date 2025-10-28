import { Board, Card, ScoreBoard } from "../../components";
import styles from "../GamePage/GamePage.module.css";
import { getCards } from "../../utils/getCards";
import { BoardProvider } from "../../providers/BoardProvider";

function GamePage()
{
    const cards_count = 20;

    let cards = getCards(cards_count);

    cards = cards.map((card, i) => <Card
        cardImageName={ card }
        key={i}
    />);

    return <div className={styles.board_container}>
        <Board>
            <BoardProvider>
                { cards }
            <ScoreBoard />
            </BoardProvider>
        </Board>
    </div>
}

export default GamePage;
