import { Board, Card, ScoreBoard } from "../../components";
import styles from "../GamePage/GamePage.module.css";
import { shuffle } from "../../utils/utils";

function GamePage()
{
    const card_count = 20;
    const card_pairs = card_count / 2;

    let file_names = ["bug.png", "dih_to_yo.jpg", "mr_beast.jpg", "s1mple.jpg", "you_should_switch_to_linux.jpg"];

    file_names = shuffle(file_names);
    file_names = file_names.slice(0, card_pairs);

    let cards = [...file_names, ...file_names];
    cards = shuffle(cards);

    cards = cards.map((card, i) => <Card
        card_image_path={ card }
        key={i}
    />);

    console.log(cards);

    return <div className={styles.board_container}>
        <Board>
            { cards }
            <ScoreBoard />
        </Board>
    </div>
}

export default GamePage;
