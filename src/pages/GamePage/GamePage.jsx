import { Board, Card, ScoreBoard } from "../../components";
import styles from "../GamePage/GamePage.module.css"

function GamePage()
{
    let card_count = 20;

    let cards = [];

    for (let i = 0; i < card_count; i++)
    {
        cards.push({ id: i });
    }

    cards = cards.map(card => <Card key={card.id} />);

    return <div className={styles.board_container}>
        <Board card_count={ 20 }>
            { cards }
            <ScoreBoard></ScoreBoard>
        </Board>
    </div>
}

export default GamePage;
