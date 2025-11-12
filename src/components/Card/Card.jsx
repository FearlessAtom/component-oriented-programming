import styles from "../Card/Card.module.css";
import { useEffect, useState } from "react";
import { useBoard } from "../../providers";

function Card({cardImageName}) {
    const [flipped, setFlipped] = useState(false);
    const [cardId, setCardId] = useState(""); 

    const board = useBoard();

    useEffect(() => {
        setCardId(Math.random());
    }, []);

    return <div
        className={styles.card + (flipped ? " " + styles.flipped : "")}
        onClick={ () => board.flipCard({ cardImageName, cardId, setFlipped, flipped }) }
    >
        <div className={styles.card_image + " " + styles.card_image_front}>
            <p className={styles.card_image_front_text}>?</p>
        </div>

        <img
            className={styles.card_image_flipped + " " + styles.card_image}
            src={ "./src/assets/cards/" + cardImageName}
        />
    </div>
}

export { Card };
