import styles from "../Card/Card.module.css";
import { useBoard } from "../../providers";

function Card({card}) {
    const board = useBoard();

    return <div
        className={styles.card + (board.isFlipped(card.cardId) ? " " + styles.flipped : "")}
        onClick={ () => board.flipCard(card.cardId) }
    >
        <div className={styles.card_image + " " + styles.card_image_front}>
            <p className={styles.card_image_front_text}>?</p>
        </div>

        <img
            className={styles.card_image_flipped + " " + styles.card_image}
            src={ "./src/assets/cards/" + card.cardImageName}
        />
    </div>
}

export default Card;
