import { Board, Card, ScoreBoard } from "../../components";
import styles from "../GamePage/GamePage.module.css";
import { getCards } from "../../utils/getCards";
import { BoardProvider, useSettings,  } from "../../providers";

function GamePage()
{
    const settings = useSettings();

    let cards = getCards(settings.cardCount);

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
