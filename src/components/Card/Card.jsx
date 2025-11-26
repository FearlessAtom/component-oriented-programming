import styles from "../Card/Card.module.css";
import { useState } from "react";
import { useBoard } from "../../providers";
import { get_uuid } from "../../utils/utils";

function Card(props) {
    const [flipped, setFlipped] = useState(false);
    const [cardId, setCardId] = useState(get_uuid());

    const board = useBoard();

    return <div
        className={styles.card + (flipped ? " " + styles.flipped : "")}
        onClick={ () => board.flipCard({ cardImageName: props.cardImageName , cardId, setFlipped, flipped }) }
    >
        <div className={styles.card_image + " " + styles.card_image_front}>
            <p className={styles.card_image_front_text}>?</p>
        </div>

        <img
            className={styles.card_image_flipped + " " + styles.card_image}
            src={ "./src/assets/cards/" + props.cardImageName}
        />
    </div>
}

export default Card;
