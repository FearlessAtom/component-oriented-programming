import styles from "../Card/Card.module.css";

function Card({card, isFlipped, onFlip}) {
    return <div
        className={styles.card + (isFlipped ? " " + styles.flipped : "")}
        onClick={ onFlip }
    >
        <div className={styles.card_image + " " + styles.card_image_front}>
            <p className={styles.card_image_front_text}>?</p>
        </div>

        <img
            className={styles.card_image_flipped + " " + styles.card_image}
            src={ "/src/assets/cards/" + card.cardImageName}
        />
    </div>
}

export default Card;
