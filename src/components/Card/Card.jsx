import { useState } from "react";
import styles from "../Card/Card.module.css";

function Card({on_flip, card_image_path})
{
    const [flipped, setFlipped] = useState(false);

    const flip = () =>
    {
        setFlipped(previous_value =>
        {
            const new_value = !previous_value;
            if (on_flip) on_flip(new_value);
            return new_value;
        });
    }

    console.log(card_image_path);

    return <div
        className={styles.card + (flipped ? " " + styles.flipped : "")}
        onClick={flip}
    >
        <div className={styles.card_image + " " + styles.card_image_front}>
            <p className={styles.card_image_front_text}>?</p>
        </div>

        <img
            className={styles.card_image_flipped + " " + styles.card_image}
            src={ "./src/assets/cards/" + card_image_path }
        />
    </div>
}

export { Card };
