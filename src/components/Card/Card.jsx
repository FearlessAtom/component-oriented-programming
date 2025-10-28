import { useEffect, useState } from "react";
import styles from "../Card/Card.module.css";
import { useBoard } from "../../hooks";

function Card({cardImageName})
{
    const [flipped, setFlipped] = useState(false);
    const [cardId, setCardId] = useState(""); 

    const flipCard = useBoard();

    useEffect(() => 
    {
        setCardId(Math.random());
    }, []);

    const onClick = () =>
    {
        flipCard({ cardImageName, cardId, setFlipped });
    }

    return <div
        className={styles.card + (flipped ? " " + styles.flipped : "")}
        onClick={onClick}
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
